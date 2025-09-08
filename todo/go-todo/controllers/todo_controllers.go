package controllers

import (
	"fmt"
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

// get todos
func (s *APIServer) HandleGetTodos(c *gin.Context) {
	todos, err := s.storage.GetTodos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	count := len(*todos)
	label := "todos"
	if count == 1 {
		label = "todo"
	}

	c.JSON(http.StatusOK, gin.H{"todos": todos, "total": fmt.Sprintf("%d %s", count, label)})
}

// get todo by id
func (s *APIServer) HandleGetTodoByID(c *gin.Context) {
	id := c.Param("id")
	todo, err := s.storage.GetTodoByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"todo": todo})
}
