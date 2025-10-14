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

type UserResponse struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type RegisterResponse struct {
	Status       string       `json:"status"`
	Message      string       `json:"message"`
	User         UserResponse `json:"user"`
	AccessToken  string       `json:"access_token"`
	RefreshToken string       `json:"refresh_token"`
}

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
	hashRefreshToken := utils.HashCredential(refreshToken)
	if err := s.storage.UpdateRefreshToken(user.ID, hashRefreshToken); err != nil {
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
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	emailExists, err := s.storage.IsEmailExists(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
		return
	}
	if emailExists {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	// hash password
	hashPassword := utils.HashCredential(password)
	user.Password = hashPassword

	// save user
	if err := s.storage.Register(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := s.storage.GetUserByEmail(user.Email)
	if err != nil || user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentails"})
		return
	}

	// validate password
	if !utils.ValidateCredential(user.Password, password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentails"})
		return
	}

	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
