package routes

import (
	"go-auth/controllers"
	"go-auth/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Router(store repositories.Storage, db *gorm.DB) http.Handler {
	router := gin.Default()
	r := controllers.NewAPIServer(store)

	router.POST("/signup", r.HandleCreateAccount)
	router.POST("/login", r.HandleUserLogin)
	router.GET("/check_auth", r.HandleCheckAuth)
	router.POST("/send_email", r.HandleSendVerificationEmail)
	router.GET("/verify_email", r.HandleVerifyEmail)
	router.POST("/reset_password", r.HandleResetPassword)
	router.POST("/refresh", r.HandleRefreshToken)

	return router
}
