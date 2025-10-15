package routes

import (
	"go-chat/controllers"
	"go-chat/middlewares"
	"go-chat/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Router(store repositories.Storage, hub *controllers.Hub) http.Handler {

	router := gin.Default()
	r := controllers.NewAPIServer(store)
	authMiddleware := middlewares.AuthMiddleware(store)

	// messages
	router.GET("/messages/:room", r.HandleGetMessages)
	// auth
	router.POST("/register", r.HandleRegisterUser)
	router.POST("/login", r.HandleLoginUser)
	router.POST("/refresh", r.HandleRefreshToken)
	// users
	router.GET("/users", r.HandleGetUsers)
	router.GET("/user/:id", r.HandleGetUserByID)
	router.DELETE("/user/:id", authMiddleware, r.HandleDeleteUser)

	// websocket
	router.GET("/ws", func(c *gin.Context) {
		controllers.ServeWS(hub, c.Writer, c.Request)
	})

	return router
}
