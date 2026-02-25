package repositories

import (
	"go-auth/models"

	"gorm.io/gorm"
)

type Storage interface {
	CreateAccount(user *models.User) error
	UpdateRefreshToken(id string, refreshToken string) error
	GetUserByEmail(email string) (*models.User, error)
	GetUserByUsername(username string) (*models.User, error)
	IsEmailExists(email string) (bool, error)
	IsUsernameExists(username string) (bool, error)
	GetUsers() ([]models.User, error)
	GetUserByID(id string) (*models.User, error)
	DeleteUser(id string) error
	UpdateUser(user *models.User, id string) error
	UpdateUserPassword(password string, id string) error
	UpdateUserEmail(email string, id string) error
	SendVerificationEmail(toEmail string, token, pathPrefix string) error
}

type PostgresStore struct {
	db *gorm.DB
}

func NewPostgresStore(db *gorm.DB) *PostgresStore {
	return &PostgresStore{db: db}
}
