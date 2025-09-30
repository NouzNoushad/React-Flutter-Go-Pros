package repositories

import (
	"context"
	"go-chat/models"
)

// get messages
func (s *PostgresStore) GetMessages(room string, limit int) ([]models.Message, error) {
	var messages []models.Message
	err := s.db.Where("room = ?", room).Order("created_at asc").Limit(limit).Find(&messages).Error
	return messages, err
}

// get message by id
func (s *PostgresStore) GetMessageByID(id string) (*models.Message, error) {
	var msg models.Message
	err := s.db.Where("id = ?", id).First(&msg).Error
	if err != nil {
		return nil, err
	}
	return &msg, nil
}

// save message
func (s *PostgresStore) SaveMessage(ctx context.Context, msg *models.Message) error {
	return s.db.WithContext(ctx).Create(msg).Error
}
