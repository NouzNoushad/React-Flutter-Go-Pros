package controllers

import (
	"fmt"
	"go-noobies/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// create course
func (s *APIServer) HandleCreateCourse(c *gin.Context) {
	title := c.PostForm("title")
	description := c.PostForm("description")
	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	course := &models.Course{
		Title:       title,
		Description: description,
	}

	if err := s.storage.CreateCourse(course); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save course"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "New course created", "course": course})
}

// get courses
func (s *APIServer) HandleGetCourses(c *gin.Context) {
	courses, err := s.storage.GetCourses()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	count := len(*courses)
	label := "courses"
	if count == 1 {
		label = "course"
	}

	c.JSON(http.StatusOK, gin.H{"courses": courses, "total": fmt.Sprintf("%d %s", count, label)})
}

// get course by id
func (s *APIServer) HandleGetCourseByID(c *gin.Context) {
	id := c.Param("id")
	course, err := s.storage.GetCourseByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"course": course})
}

// delete course
func (s *APIServer) HandleDeleteCourse(c *gin.Context) {
	id := c.Param("id")
	err := s.storage.DeleteCourse(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Course deleted"})
}
