package repository

import "go-noobies/models"

// upload video
func (s *PostgresStore) UploadVideo(video *models.Video) error {
	return s.db.Create(video).Error
}

// update video
func (s *PostgresStore) UpdateVideo(id string, updates map[string]interface{}) error {
	return s.db.Model(&models.Video{}).Where("id = ?", id).Updates(updates).Error
}

// get videos
func (s *PostgresStore) GetVideos() (*[]models.Video, error) {
	var videos []models.Video
	err := s.db.Order("created_at DESC").Find(&videos).Error
	return &videos, err
}

// get video by id
func (s *PostgresStore) GetVideoByID(id string) (*models.Video, error) {
	var video models.Video
	err := s.db.Where("id = ?", id).First(&video).Error
	return &video, err
}

// get video by module id
func (s *PostgresStore) GetVideosByModuleID(moduleID string) (*[]models.Video, error) {
	var videos []models.Video
	err := s.db.Where("module_id = ?", moduleID).Find(&videos).Error
	return &videos, err
}