package repositories

import (
	"go-chat/models"

	"gorm.io/gorm"
)

type PostgresStore struct {
	db *gorm.DB
}

func NewPostgresStore(db *gorm.DB) *PostgresStore {
	db.AutoMigrate(&models.Message{})

	return &PostgresStore{db: db}
}
