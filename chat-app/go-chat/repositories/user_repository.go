package repositories

import "go-chat/models"

// create user
func (s *PostgresStore) Register(user *models.User) error {
	return s.db.Create(user).Error
}
