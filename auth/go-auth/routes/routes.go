package routes

import (
	"go-auth/controllers"
	"go-auth/repositories"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func Router(store repositories.Storage) http.Handler {
	router := gin.Default()

	googleOAuthConfig := &oauth2.Config{
		RedirectURL:  "http://localhost:8030/auth/google/callback",
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}

	r := controllers.NewAPIServer(store, googleOAuthConfig)

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
