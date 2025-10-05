package repository

import (
	"go-noobies/models"

	"gorm.io/gorm"
)

type Storage interface {
	// course
	CreateCourse(course *models.Course) error
	GetCourses() (*[]models.Course, error)
	GetCourseByID(id string) (*models.Course, error)
	DeleteCourse(id string) error
	UpdateCourse(course *models.Course, id string) error

	// module
	CreateModule(module *models.Module) error
	GetModules() (*[]models.Module, error)
	GetModulesByCourseID(courseID string) (*[]models.Module, error)
	GetModuleByID(id string) (*models.Module, error)
	DeleteModule(id string) error
	UpdateModule(module *models.Module, id string) error

	// vidoe
	UploadVideo(video *models.Video) error
	UpdateVideo(id string, updates map[string]interface{}) error
	GetVideos() (*[]models.Video, error)
	GetVideoByID(id string) (*models.Video, error)
	GetVideosByModuleID(moduleID string) (*[]models.Video, error)
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
