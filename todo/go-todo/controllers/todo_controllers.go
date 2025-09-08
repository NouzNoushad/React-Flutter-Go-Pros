package controllers

import (
	"go-todo/models"
	"go-todo/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// create todo
func (s *APIServer) HandleCreateTodo(c *gin.Context) {
	todo := new(models.Todo)

	todo.Title = c.PostForm("title")
	todo.Description = c.PostForm("description")

	// validation
	if err := utils.TodoValidation(todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// save
	if err := s.storage.CreateTodo(todo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Todo created"})
}
