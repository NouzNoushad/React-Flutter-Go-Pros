package repository

import "go-noobies/models"

// create course
func (s *PostgresStore) CreateCourse(course *models.Course) error {
	return s.db.Create(course).Error
}

// get courses
func (s *PostgresStore) GetCourses() (*[]models.Course, error) {
	var courses []models.Course
	err := s.db.Order("created_at DESC").Find(&courses).Error
	return &courses, err
}

// get course by id
func (s *PostgresStore) GetCourseByID(id string) (*models.Course, error) {
	var course models.Course
	err := s.db.Where("id = ?", id).First(&course).Error
	return &course, err
}

// delete course
func (s *PostgresStore) DeleteCourse(id string) error {
	return s.db.Where("id = ?", id).Delete(&models.Course{}).Error
}

// update course
func (s *PostgresStore) UpdateCourse(course *models.Course, id string) error {
	return s.db.Model(models.Course{}).Where("id = ?", id).Select("*").Updates(course).Error
}