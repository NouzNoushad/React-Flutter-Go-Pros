package main

import (
	"go-todo/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	routes.Router(r)

	r.Run(":8080")
}
