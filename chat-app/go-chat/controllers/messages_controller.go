package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *APIServer) HandleGetMessages(c *gin.Context) {
	room := c.Param("room")

	messages, err := s.storage.GetMessages(room, 50)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Status: Failed, Message: err.Error()})
		return
	}

	messagesData := make([]Message, 0, len(messages))

	for _, m := range messages {
		messagesData = append(messagesData, Message{
			ID:             m.ID,
			Type:           m.Type,
			Sender:         m.Sender,
			Room:           m.Room,
			Content:        m.Content,
			ReplyToMessage: m.ReplyToMessage,
			CreatedAt:      m.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, MessagesResponse{
		Status:   Success,
		Messages: messagesData,
	})
}
