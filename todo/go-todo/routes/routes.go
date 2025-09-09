package routes

import (
	"go-todo/config"
	"go-todo/controllers"
	"go-todo/repository"

	"github.com/gin-gonic/gin"
)

func Router(router *gin.Engine) {
	db := config.ConnectDB()
	store := repository.NewPostgresStore(db)

	r := controllers.NewAPIServer(store)

	router.POST("/todo", r.HandleCreateTodo)
	router.GET("/todo", r.HandleGetTodos)
	router.GET("/todo/:id", r.HandleGetTodoByID)
	router.DELETE("/todo/:id", r.HandleDeleteTodo)
	router.PUT("/todo/:id", r.HandleUpdateTodo)
}
