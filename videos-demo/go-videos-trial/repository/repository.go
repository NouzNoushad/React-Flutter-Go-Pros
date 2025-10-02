package repository

import (
	"go-videos-trial/models"

	"gorm.io/gorm"
)

type Storage interface {
	UploadVideo(video *models.Video) error
	UpdateVideo(id string, updates map[string]interface{}) error
	GetVideos() (*[]models.Video, error)
	GetVideoByID(id string) (*models.Video, error)
}

type PostgresStore struct {
	db *gorm.DB
}

func NewPostgresStore(db *gorm.DB) *PostgresStore {
	db.AutoMigrate(&models.Video{})

	return &PostgresStore{db: db}
}
