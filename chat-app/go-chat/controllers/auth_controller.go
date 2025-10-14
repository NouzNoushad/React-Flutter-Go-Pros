package controllers

import (
	"go-chat/models"
	"go-chat/utils"
	"net/http"
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

func (s *APIServer) HandleRegisterUser(c *gin.Context) {
	user := new(models.User)

	user.Username = c.PostForm("username")
	user.Email = c.PostForm("email")
	password := c.PostForm("password")

	// validations
	if err := utils.UserValidations(user, password); err != nil {
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

	// create tokens
	accessToken, err := utils.CreateJWT(user, 1*time.Hour) // 1 hr
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create access token"})
		return
	}
	refreshToken, err := utils.CreateJWT(user, 7*24*time.Hour) // 7 days
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create refresh token"})
		return
	}

	// update refresh token
	hashRefreshToken := utils.HashCredential(refreshToken)
	if err := s.storage.UpdateRefreshToken(user.ID, hashRefreshToken); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update refresh token"})
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
