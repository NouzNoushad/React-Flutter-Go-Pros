package controllers

import (
	"fmt"
	"go-chat/models"
	"go-chat/utils"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// create tokens
func (s *APIServer) createTokens(user *models.User) (string, string, error) {
	accessToken, err := utils.CreateJWT(user, 1*time.Hour) // 1 hr
	if err != nil {
		return "", "", fmt.Errorf("failed to create access token: %w", err)
	}
	refreshToken, err := utils.CreateJWT(user, 7*24*time.Hour) // 7 days
	if err != nil {
		return "", "", fmt.Errorf("failed to create refresh token: %w", err)
	}

	// update refresh token
	hashedRefreshToken := utils.HashRefreshToken(refreshToken)

	if err := s.storage.UpdateRefreshToken(user.ID, hashedRefreshToken); err != nil {
		return "", "", fmt.Errorf("failed to update refresh token: %w", err)
	}

	return accessToken, refreshToken, nil
}

// register user
func (s *APIServer) HandleRegisterUser(c *gin.Context) {
	user := new(models.User)

	user.Username = c.PostForm("username")
	user.Email = c.PostForm("email")
	password := c.PostForm("password")

	// validations
	if err := utils.ValidateRegister(user, password); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Status: "failed", Message: err.Error()})
		return
	}

	emailExists, err := s.storage.IsEmailExists(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Status: "failed", Message: "Server error"})
		return
	}
	if emailExists {
		c.JSON(http.StatusConflict, ErrorResponse{Status: "failed", Message: "Email already exists"})
		return
	}

	// hash password
	hashPassword := utils.HashCredential(password)
	user.Password = hashPassword

	// save user
	if err := s.storage.Register(user); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Status: "failed", Message: err.Error()})
		return
	}

	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Status: "failed", Message: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, RegisterResponse{
		Status:  "success",
		Message: "Account created",
		User: UserResponse{
			ID:    user.ID,
			Name:  user.Username,
			Email: user.Email,
		},
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

// login user
func (s *APIServer) HandleLoginUser(c *gin.Context) {
	user := new(models.User)

	user.Email = strings.TrimSpace(c.PostForm("email"))
	password := c.PostForm("password")

	// validations
	if err := utils.ValidateLogin(user, password); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Status: "failed", Message: err.Error()})
		return
	}

	user, err := s.storage.GetUserByEmail(user.Email)
	if err != nil || user == nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: "failed", Message: "Invalid credentails"})
		return
	}

	// validate password
	if !utils.ValidateCredential(user.Password, password) {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: "failed", Message: "Invalid credentails"})
		return
	}

	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Status: "failed", Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, RegisterResponse{
		Status:  "success",
		Message: "Login success",
		User: UserResponse{
			ID:    user.ID,
			Name:  user.Username,
			Email: user.Email,
		},
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

// is valid refresh token
func (s *APIServer) isValidRefreshToken(user *models.User, refreshToken string) (bool, error) {
	if user.RefreshToken == "" {
		return false, nil
	}

	if !utils.CompareRefreshToken(user.RefreshToken, refreshToken) {
		return false, nil
	}

	return true, nil
}

// refresh token
func (s *APIServer) HandleRefreshToken(c *gin.Context) {
	refreshToken := c.PostForm("refresh_token")

	claims, err := utils.VerifyJWT(refreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: "failed", Message: "Invalid refresh token"})
		return
	}

	userID, ok := claims["user_id"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: "failed", Message: "Invalid token payload"})
		return
	}

	user, err := s.storage.GetUserByID(userID)
	if err != nil || user == nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: "failed", Message: "User not found"})
		return
	}

	isValid, err := s.isValidRefreshToken(user, refreshToken)
	if err != nil || !isValid {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: "failed", Message: "Refresh token expired or invalid"})
		return
	}

	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Status: "failed", Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, RefreshTokenResponse{
		Status:       "success",
		Message:      "Token refreshed",
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}
