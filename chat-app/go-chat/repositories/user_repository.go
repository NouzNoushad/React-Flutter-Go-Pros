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
	return s.db.Model(&models.User{}).Where("id = ?", userID).Updates(UpdateRefreshTokenRequest{
		RefreshToken: refreshToken,
		UpdatedAt:    time.Now(),
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
func (s *PostgresStore) GetUsers(search string, page, limit int) (*[]models.User, int64, error) {
	var users []models.User
	var total int64

	query := s.db.Model(&models.User{})

	// search
	if search != "" {
		searchTerm := "%" + search + "%"
		query = query.Where("username ILIKE ? OR email ILIKE ?", searchTerm, searchTerm)
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	err := query.Order("created_at DESC").Offset(offset).Limit(limit).Find(&users).Error
	if err != nil {
		return nil, 0, err
	}

	return &users, total, err
}

// delete user
func (s *PostgresStore) DeleteUser(id string) error {
	return s.db.Where("id = ?", id).Delete(&models.User{}).Error
}
