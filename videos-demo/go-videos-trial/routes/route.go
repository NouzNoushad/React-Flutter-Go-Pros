package routes

import (
	"go-videos-trial/config"
	"go-videos-trial/controllers"
	"go-videos-trial/repository"

	"github.com/gin-gonic/gin"
)

func Router(router *gin.Engine) {
	db := config.ConnectDB()
	store := repository.NewPostgresStore(db)

	r := controllers.NewAPIServer(store)

	router.POST("/upload-video", r.HandleUploadVideo)
}
