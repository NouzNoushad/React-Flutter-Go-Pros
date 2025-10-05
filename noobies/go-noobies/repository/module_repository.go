package repository

import "go-noobies/models"

// create module
func (s *PostgresStore) CreateModule(module *models.Module) error {
	return s.db.Create(module).Error
}

// get modules
func (s *PostgresStore) GetModules() (*[]models.Module, error) {
	var modules []models.Module
	err := s.db.Preload("Video").Order("created_at DESC").Find(&modules).Error
	return &modules, err
}

// get modules by course id
func (s *PostgresStore) GetModulesByCourseID(courseID string) (*[]models.Module, error) {
	var modules []models.Module
	err := s.db.Preload("Video").Where("course_id = ?", courseID).Find(&modules).Error
	return &modules, err
}

// get module by id
func (s *PostgresStore) GetModuleByID(id string) (*models.Module, error) {
	var module models.Module
	err := s.db.Preload("Video").Where("id = ?", id).First(&module).Error
	return &module, err
}

// delete module
func (s *PostgresStore) DeleteModule(id string) error {
	return s.db.Where("id = ?", id).Delete(&models.Module{}).Error
}

// update module
func (s *PostgresStore) UpdateModule(module *models.Module, id string) error {
	return s.db.Model(models.Module{}).Where("id = ?", id).Select("*").Updates(module).Error
}
