package routes

import (
	"go-auth/config"
	"go-auth/controllers"
	middleware "go-auth/middlewares"
	"go-auth/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Router(store repositories.Storage) http.Handler {
	router := gin.Default()

	googleOAuthConfig := config.ConnectGoogleAuth()

	r := controllers.NewAPIServer(store, googleOAuthConfig)

	router.Use(middleware.CORSMiddleware())

	router.POST("/signup", r.HandleCreateAccount)
	router.POST("/login", r.HandleUserLogin)
	router.GET("/check_auth", r.HandleCheckAuth)
	router.POST("/send_email", r.HandleSendVerificationEmail)
	router.GET("/verify_email", r.HandleVerifyEmail)
	router.POST("/reset_password", r.HandleResetPassword)
	router.POST("/refresh", r.HandleRefreshToken)
	router.GET("/auth/google", r.HandleGoogleAuth)
	router.GET("/auth/google/callback", r.HandleGoogleCallback)
	router.POST("/logout", r.HandleLogout)

	return router
}
