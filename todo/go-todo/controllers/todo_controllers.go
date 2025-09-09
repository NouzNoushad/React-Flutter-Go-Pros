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
	isCompleteStr := c.PostForm("is_complete")

	if isCompleteStr == "" {
		todo.IsComplete = false
	} else {
		isComplete, err := utils.StringToBool(isCompleteStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format"})
			return
		}
		todo.IsComplete = isComplete
	}

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

// delete todo
func (s *APIServer) HandleDeleteTodo(c *gin.Context) {
	id := c.Param("id")
	deleteErr := s.storage.DeleteTodo(id)
	if deleteErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": deleteErr.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted"})
}

// update todo
func (s *APIServer) HandleUpdateTodo(c *gin.Context) {
	id := c.Param("id")

	todo, err := s.storage.GetTodoByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	title := c.PostForm("title")
	if title != "" {
		todo.Title = title
	}

	description := c.PostForm("description")
	if description != "" {
		todo.Description = description
	}

	isCompleteStr := c.PostForm("is_complete")
	if isCompleteStr != "" {
		isComplete, err := utils.StringToBool(isCompleteStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format"})
			return
		}
		todo.IsComplete = isComplete
	}

	// save
	if err := s.storage.UpdateTodo(todo, todo.ID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Todo updated", "todo": todo})
}
