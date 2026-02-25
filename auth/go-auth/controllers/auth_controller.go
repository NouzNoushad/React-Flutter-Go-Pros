package controllers

import (
	"fmt"
	"go-auth/models"
	"go-auth/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

// create tokens
func (s *APIServer) createTokens(user *models.User) (string, string, error) {
	accessToken, err := utils.CreateJWT(user, 1*time.Hour)
	if err != nil {
		return "", "", fmt.Errorf("failed to create access token: %w", err)
	}
	refreshToken, err := utils.CreateJWT(user, 7*24*time.Hour)
	if err != nil {
		return "", "", fmt.Errorf("failed to create refresh token: %w", err)
	}

	hashedRefreshToken := utils.HashRefreshToken(refreshToken)
	if err := s.storage.UpdateRefreshToken(user.ID, hashedRefreshToken); err != nil {
		return "", "", fmt.Errorf("failed to update refresh token: %w", err)
	}
	return accessToken, refreshToken, nil
}

// valid refresh token
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
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: Failed, Message: "Invalid refresh token"})
		return
	}

	userID, ok := claims["user_id"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: Failed, Message: "Invalid token payload"})
		return
	}

	user, err := s.storage.GetUserByID(userID)
	if err != nil || user == nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: Failed, Message: "User not found"})
		return
	}

	isValid, err := s.isValidRefreshToken(user, refreshToken)
	if err != nil || !isValid {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Status: Failed, Message: "Refresh token expired or invalid"})
		return
	}

	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Status: Failed, Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Status:       Success,
		Message:      "Token refreshed",
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

// create account
func (s *APIServer) HandleCreateAccount(c *gin.Context) {
	user := new(models.User)

	userNameStr := c.PostForm("username")
	if userNameStr != "" {
		user.Username = &userNameStr
	}

	emailStr := c.PostForm("email")
	if emailStr != "" {
		user.Email = &emailStr
	}

	roleStr := c.PostForm("role")
	if roleStr != "" {
		user.Role = roleStr
	}

	password := c.PostForm("password")

	// validation
	if err := utils.AccountValidation(user.Username, user.Email, password); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Status:  Failed,
			Message: err.Error(),
		})
		return
	}

	// check username
	usernameExists, err := s.storage.IsUsernameExists(*user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Server error",
		})
		return
	}
	if usernameExists {
		c.JSON(http.StatusConflict, ErrorResponse{
			Status:  Failed,
			Message: "That username is already taken. Please try a different one."})
		return
	}

	// check email
	emailExists, err := s.storage.IsEmailExists(*user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Server error"})
		return
	}
	if emailExists {
		c.JSON(http.StatusConflict, ErrorResponse{
			Status:  Failed,
			Message: "That email is already registered. Try logging in or using a different email."})
		return
	}

	// hash password
	hashPassword := utils.HashPassword(password)
	user.Password = &hashPassword

	// save user
	if err := s.storage.CreateAccount(user); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	// create token
	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	/// set cookie
	c.SetCookie("token", accessToken, (60 * 60 * 24 * 7), "/", "", true, true)

	c.JSON(http.StatusCreated, AuthResponse{
		Status:       Success,
		Message:      "Account created Successfully",
		AccessToken:  accessToken,
		RefreshToken: refreshToken})
}

// user login
func (s *APIServer) HandleUserLogin(c *gin.Context) {

	email := c.PostForm("email")
	password := c.PostForm("password")

	// validation
	if err := utils.LoginValidation(&email, password); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	var user *models.User
	var err error

	if utils.IsEmail(email) {
		user, err = s.storage.GetUserByEmail(email)
	} else {
		user, err = s.storage.GetUserByUsername(email)
	}

	if err != nil || user == nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Invalid credentials"})
		return
	}

	if !utils.ValidatePassword(*user.Password, password) {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Status:  Failed,
			Message: "Invalid credentials"})
		return
	}

	// create token
	accessToken, refreshToken, err := s.createTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	// set cookie
	c.SetCookie("token", accessToken, (60 * 60 * 24 * 7), "/", "", true, true)

	c.JSON(http.StatusOK, AuthResponse{
		Status:       Success,
		Message:      "Login Success",
		AccessToken:  accessToken,
		RefreshToken: refreshToken})
}

// check auth
func (s *APIServer) HandleCheckAuth(c *gin.Context) {
	tokenStr, err := c.Cookie("token")
	if err != nil || tokenStr == "" {
		c.JSON(http.StatusOK, AuthCheckResponse{
			Status:   Success,
			LoggedIn: false,
		})
		return
	}

	token, claims, err := utils.ValidateJWT(tokenStr)
	if err != nil || !token.Valid {
		c.JSON(http.StatusOK, AuthCheckResponse{
			Status:   Success,
			LoggedIn: false,
		})
		return
	}

	userID, _ := claims["user_id"].(string)
	role, _ := claims["role"].(string)

	c.JSON(http.StatusOK, AuthCheckResponse{
		Status:   Success,
		LoggedIn: true,
		UserID:   userID,
		Role:     role,
	})
}

// send verification email
func (s *APIServer) HandleSendVerificationEmail(c *gin.Context) {
	email := c.PostForm("email")
	prefix := c.PostForm("prefix")

	// validation
	if err := utils.SendEmailValidation(email); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	// check email
	emailExists, err := s.storage.IsEmailExists(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Server error"})
		return
	}
	if !emailExists {
		c.JSON(http.StatusConflict, ErrorResponse{
			Status:  Failed,
			Message: "This email is not registered with us"})
		return
	}

	token, err := utils.CreateEmailToken(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Failed to generate token"})
		return
	}

	if err := s.storage.SendVerificationEmail(email, token, prefix); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Failed to send otp"})
		return
	}

	c.JSON(http.StatusOK, SuccessResponse{
		Status:  Success,
		Message: token})
}

// verify token
func (s *APIServer) verifyToken(c *gin.Context, tokenStr string) (string, bool) {
	// validation
	if tokenStr == "" {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Status:  Failed,
			Message: "Invalid token"})
		return "", false
	}

	token, claims, err := utils.VerifyEmailToken(tokenStr)
	if err != nil {
		if err.(*jwt.ValidationError).Errors == jwt.ValidationErrorExpired {
			c.JSON(http.StatusUnauthorized, ErrorResponse{
				Status:  Failed,
				Message: "Token expired"})
			return "", false
		}

		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Status:  Failed,
			Message: "Invalid token"})
		return "", false
	}

	if !token.Valid {
		c.JSON(http.StatusForbidden, ErrorResponse{
			Status:  Failed,
			Message: "Invalid token"})
		return "", false
	}

	email, ok := claims["email"].(string)
	if !ok {
		c.JSON(http.StatusForbidden, ErrorResponse{
			Status:  Failed,
			Message: "Email claim missing in token"})
		return "", false
	}

	return email, true
}

// verify email
func (s *APIServer) HandleVerifyEmail(c *gin.Context) {
	tokenStr := c.Query("token")

	email, ok := s.verifyToken(c, tokenStr)
	if !ok {
		return
	}

	c.JSON(http.StatusOK, SuccessResponse{
		Status:  Success,
		Message: email})
}

// reset password
func (s *APIServer) HandleResetPassword(c *gin.Context) {
	token := c.PostForm("token")
	newPassword := c.PostForm("password")
	confirmPassword := c.PostForm("confirm_password")

	// verify token
	email, ok := s.verifyToken(c, token)
	if !ok {
		return
	}

	// validation
	if err := utils.ResetPasswordValidation(email, newPassword, confirmPassword); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	// check email
	emailExists, err := s.storage.IsEmailExists(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Server error"})
		return
	}
	if !emailExists {
		c.JSON(http.StatusConflict, ErrorResponse{
			Status:  Failed,
			Message: "Invalid reset request"})
		return
	}

	user, err := s.storage.GetUserByEmail(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: "Invalid reset request"})
		return
	}

	// hash password
	hashPassword := utils.HashPassword(newPassword)

	if err := s.storage.UpdateUserPassword(hashPassword, user.ID); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, SuccessResponse{
		Status:  Success,
		Message: "Password reset complete. You're all set!"})
}

// reset email
func (s *APIServer) HandleResetEmail(c *gin.Context) {
	userID := c.Param("id")
	password := c.PostForm("password")
	newEmail := c.PostForm("email")

	user, err := s.storage.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Status:  Failed,
			Message: "Invalid user id"})
		return
	}

	// auth check
	userVal, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Status:  Failed,
			Message: "Unauthorized"})
		return
	}
	_ = userVal.(*models.User)

	// validation
	if password == "" || newEmail == "" {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Status:  Failed,
			Message: "email and password are required"})
		return
	}

	// check password
	if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(password)); err != nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Status:  Failed,
			Message: "Invalid credential"})
		return
	}

	// update email
	if err := s.storage.UpdateUserEmail(newEmail, user.ID); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, SuccessResponse{
		Status:  Success,
		Message: "Email updated!"})
}

// logout
func (s *APIServer) HandleLogout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, SuccessResponse{
		Status:  Success,
		Message: "Logged out"})
}
