package main

import (
	"go-videos-trial/middleware"
	"go-videos-trial/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	routes.Router(r)

	r.Run(":8080")
}
