package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// get users
func (s *APIServer) HandleGetUsers(c *gin.Context) {
	users, err := s.storage.GetUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  "failed",
			Message: err.Error(),
		})
		return
	}

	usersResponse := make([]UserResponse, 0, len(*users))
	for _, u := range *users {
		usersResponse = append(usersResponse, UserResponse{
			ID:    u.ID,
			Name:  u.Username,
			Email: u.Email,
		})
	}

	count := len(usersResponse)
	label := "users"
	if count == 1 {
		label = "user"
	}

	c.JSON(http.StatusOK, UsersResponse{
		Status: "success",
		Users:  usersResponse,
		Total:  fmt.Sprintf("%d %s", count, label),
	})
}

// get user by id
func (s *APIServer) HandleGetUserByID(c *gin.Context) {
	id := c.Param("id")

	user, err := s.storage.GetUserByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  "failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, UserByIDResponse{
		Status: "success",
		User: UserResponse{
			ID:    user.ID,
			Name:  user.Username,
			Email: user.Email,
		},
	})
}
