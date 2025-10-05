package main

import (
	"go-noobies/middlewares"
	"go-noobies/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())
	r.Static("/uploads", "./uploads")

	routes.Router(r)

	r.Run(":8080")
}
