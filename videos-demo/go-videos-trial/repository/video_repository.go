package repository

import "go-videos-trial/models"

// upload video
func (s *PostgresStore) UploadVideo(video *models.Video) error {
	return s.db.Create(video).Error
}

// update video
func (s *PostgresStore) UpdateVideo(id string, updates map[string]interface{}) error {
	return s.db.Model(&models.Video{}).Where("id = ?", id).Updates(updates).Error
}
