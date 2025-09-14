package repositories

import (
	"context"
	"go-chat/models"

	"gorm.io/gorm"
)

type Storage interface {
	GetMessages(room string, limit int) ([]models.Message, error)
	GetMessageByID(id string) (*models.Message, error)
	SaveMessage(ctx context.Context, msg *models.Message) error
}

type PostgresStore struct {
	db *gorm.DB
}

func NewPostgresStore(db *gorm.DB) *PostgresStore {
	db.AutoMigrate(&models.Message{})

	return &PostgresStore{db: db}
}
