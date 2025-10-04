package repository

import "go-noobies/models"

// create course
func (s *PostgresStore) CreateCourse(course *models.Course) error {
	return s.db.Create(course).Error
}

// create module
func (s *PostgresStore) CreateModule(module *models.Module) error {
	return s.db.Create(module).Error
}

// upload video
func (s *PostgresStore) UploadVideo(video *models.Video) error {
	return s.db.Create(video).Error
}

// update video
func (s *PostgresStore) UpdateVideo(id string, updates map[string]interface{}) error {
	return s.db.Model(&models.Video{}).Where("id = ?", id).Updates(updates).Error
}
