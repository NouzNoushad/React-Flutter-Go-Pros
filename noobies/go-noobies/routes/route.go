package routes

import (
	"go-noobies/config"
	"go-noobies/controllers"
	"go-noobies/repository"

	"github.com/gin-gonic/gin"
)

func Router(router *gin.Engine) {
	db := config.ConnectDB()
	store := repository.NewPostgresStore(db)

	r := controllers.NewAPIServer(store)

	// course
	router.POST("/course", r.HandleCreateCourse)
	router.GET("/course", r.HandleGetCourses)
	router.GET("/course/:id", r.HandleGetCourseByID)
	router.DELETE("/course/:id", r.HandleDeleteCourse)

	// module
	router.POST("/module", r.HandleCreateModule)
	router.GET("/module", r.HandleGetModules)
	router.GET("/module/:id", r.HandleGetModuleByID)
	router.DELETE("/module/:id", r.HandleDeleteModule)
}
