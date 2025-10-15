package repositories

import (
	"context"
	"go-chat/models"

	"gorm.io/gorm"
)

type Storage interface {
	// Messages
	GetMessages(room string, limit int) ([]models.Message, error)
	GetMessageByID(id string) (*models.Message, error)
	SaveMessage(ctx context.Context, msg *models.Message) error

	// User
	Register(user *models.User) error
	IsEmailExists(email string) (bool, error)
	UpdateRefreshToken(userID string, refreshToken string) error
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id string) (*models.User, error)
	GetUsers() (*[]models.User, error)
}

type PostgresStore struct {
	db *gorm.DB
}

func NewPostgresStore(db *gorm.DB) *PostgresStore {
	db.AutoMigrate(&models.Message{})
	db.AutoMigrate(&models.User{})

	return &PostgresStore{db: db}
}
