package repositories

import (
	"fmt"
	"go-auth/models"
	"os"
	"time"

	"github.com/go-resty/resty/v2"
)

type UpdateRefreshTokenRequest struct {
	RefreshToken string    `json:"refresh_token"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// create account
func (s *PostgresStore) CreateAccount(user *models.User) error {
	return s.db.Create(user).Error
}

// update refresh token
func (s *PostgresStore) UpdateRefreshToken(id string, refreshToken string) error {
	return s.db.Model(&models.User{}).Where("id = ?", id).Updates(UpdateRefreshTokenRequest{
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

// get user by username
func (s *PostgresStore) GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	err := s.db.Where("username = ?", username).First(&user).Error
	return &user, err
}

// check email exists
func (s *PostgresStore) IsEmailExists(email string) (bool, error) {
	var count int64
	err := s.db.Model(&models.User{}).Where("email = ?", email).Count(&count).Error
	return count > 0, err
}

// check username exists
func (s *PostgresStore) IsUsernameExists(username string) (bool, error) {
	var count int64
	err := s.db.Model(&models.User{}).Where("username = ?", username).Count(&count).Error
	return count > 0, err
}

// get users
func (s *PostgresStore) GetUsers() ([]models.User, error) {
	var users []models.User
	err := s.db.Order("created_at asc").Find(&users).Error
	return users, err
}

// get user by id
func (s *PostgresStore) GetUserByID(id string) (*models.User, error) {
	var user models.User
	err := s.db.Where("id = ?", id).First(&user).Error
	return &user, err
}

// delete user
func (s *PostgresStore) DeleteUser(id string) error {
	return s.db.Where("id = ?", id).Delete(&models.User{}).Error
}

// update user
func (s *PostgresStore) UpdateUser(user *models.User, id string) error {
	return s.db.Model(models.User{}).Where("id = ?", id).Updates(user).Error
}

// update password
func (s *PostgresStore) UpdateUserPassword(password string, id string) error {
	return s.db.Model(models.User{}).Where("id = ?", id).Update("password", password).Error
}

// update email
func (s *PostgresStore) UpdateUserEmail(email string, id string) error {
	return s.db.Model(models.User{}).Where("id = ?", id).Update("email", email).Error
}

type EmailRequest struct {
	Sender      map[string]string   `json:"sender"`
	To          []map[string]string `json:"to"`
	Subject     string              `json:"subject"`
	TextContent string              `json:"textContent"`
	HtmlContent string              `json:"htmlContent"`
}

// send verification email
func (s *PostgresStore) SendVerificationEmail(toEmail string, token, pathPrefix string) error {
	client := resty.New()

	apiKey := os.Getenv("BREVO_API_KEY")

	resetLink := fmt.Sprintf("http://localhost:3000/%s/verify-email?token=%s", pathPrefix, token)

	email := EmailRequest{
		Sender: map[string]string{
			"name":  "My Cartoon List",
			"email": os.Getenv("EMAIL_FROM"),
		},
		To: []map[string]string{
			{
				"email": toEmail,
			},
		},
		Subject:     "Your Verification Link",
		TextContent: resetLink,
		HtmlContent: fmt.Sprintf(`<p>Click the link to verify: <a href="%s">Verify Email</a></p>`, resetLink),
	}

	response, err := client.R().
		SetHeader("accept", "application/json").
		SetHeader("api-key", apiKey).
		SetHeader("content-type", "application/json").
		SetBody(email).
		Post("https://api.brevo.com/v3/smtp/email")

	if err != nil {
		return err
	}

	if response.IsError() {
		return fmt.Errorf("API error: %s", response.String())
	}

	return nil
}
