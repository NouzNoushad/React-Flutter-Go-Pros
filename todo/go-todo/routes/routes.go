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
}
