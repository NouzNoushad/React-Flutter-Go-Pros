package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *APIServer) HandleGetMessages(c *gin.Context) {
	room := c.Param("room")

	messages, err := s.storage.GetMessages(room, 50)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, messages)
}
