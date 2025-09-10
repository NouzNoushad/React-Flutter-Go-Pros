package main

import (
	"go-todo/middleware"
	"go-todo/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	routes.Router(r)

	r.Run(":8080")
}
