package repositories

import (
	"go-chat/models"
	"time"
)

// create user
func (s *PostgresStore) Register(user *models.User) error {
	return s.db.Create(user).Error
}

// check email exists
func (s *PostgresStore) IsEmailExists(email string) (bool, error) {
	var count int64
	err := s.db.Model(&models.User{}).Where("email = ?", email).Count(&count).Error
	return count > 0, err
}

// update refresh tokne
func (s *PostgresStore) UpdateRefreshToken(userID string, refreshToken string) error {
	return s.db.Model(&models.User{}).Where("id = ?", userID).Updates(map[string]interface{}{
		"refresh_token": refreshToken,
		"updated_at":    time.Now(),
	}).Error
}

// get user by email
func (s *PostgresStore) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := s.db.Where("email = ?", email).First(&user).Error
	return &user, err
}

// get user by id
func (s *PostgresStore) GetUserByID(id string) (*models.User, error) {
	var user models.User
	err := s.db.Where("id = ?", id).First(&user).Error
	return &user, err
}

// get users
func (s *PostgresStore) GetUsers() (*[]models.User, error) {
	var users []models.User
	err := s.db.Order("created_at DESC").Find(&users).Error
	return &users, err
}

// delete user
func (s *PostgresStore) DeleteUser(id string) error {
	return s.db.Where("id = ?", id).Delete(&models.User{}).Error
}
