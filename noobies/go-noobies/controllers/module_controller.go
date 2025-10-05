package controllers

import (
	"fmt"
	"go-noobies/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// create module
func (s *APIServer) HandleCreateModule(c *gin.Context) {
	moduleTitle := c.PostForm("module_title")
	moduleDescription := c.PostForm("module_description")
	courseID := c.PostForm("course_id")
	if moduleTitle == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Module title is required"})
		return
	}
	if courseID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course id is required"})
		return
	}

	video, err := s.handleUploadVideo(c)
	if err != nil {
		return
	}

	module := &models.Module{
		CourseID:          courseID,
		ModuleTitle:       moduleTitle,
		ModuleDescription: moduleDescription,
		Video:             *video,
	}

	if err := s.storage.CreateModule(module); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save course"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "New module created", "module": module})
}

// get modules
func (s *APIServer) HandleGetModules(c *gin.Context) {
	modules, err := s.storage.GetModules()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	count := len(*modules)
	label := "modules"
	if count == 1 {
		label = "module"
	}

	c.JSON(http.StatusOK, gin.H{"modules": modules, "total": fmt.Sprintf("%d %s", count, label)})
}

// get module by id
func (s *APIServer) HandleGetModuleByID(c *gin.Context) {
	id := c.Param("id")
	module, err := s.storage.GetModuleByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"module": module})
}

// delete module
func (s *APIServer) HandleDeleteModule(c *gin.Context) {
	id := c.Param("id")
	err := s.storage.DeleteModule(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Module deleted"})
}
