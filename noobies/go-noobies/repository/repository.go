package repository

import (
	"go-noobies/models"

	"gorm.io/gorm"
)

type Storage interface {
	CreateCourse(course *models.Course) error
	CreateModule(module *models.Module) error
	UploadVideo(video *models.Video) error
	UpdateVideo(id string, updates map[string]interface{}) error
}

type PostgresStore struct {
	db *gorm.DB
}

func NewPostgresStore(db *gorm.DB) *PostgresStore {
	db.AutoMigrate(&models.Course{})
	db.AutoMigrate(&models.Module{})
	db.AutoMigrate(&models.Video{})

	return &PostgresStore{db: db}
}
