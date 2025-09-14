package routes

import (
	"go-chat/controllers"
	"go-chat/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Router(store repositories.Storage, hub *controllers.Hub) http.Handler {

	router := gin.Default()
	
	// api
	r := controllers.NewAPIServer(store)
	router.GET("/messages/:room", r.HandleGetMessages)

	// websocket
	router.GET("/ws", func(c *gin.Context) {
		controllers.ServeWS(hub, c.Writer, c.Request)
	})

	return router
}