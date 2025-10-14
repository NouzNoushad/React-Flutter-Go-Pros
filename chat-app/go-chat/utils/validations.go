package utils

import (
	"errors"
	"go-chat/models"
	"regexp"
)

func validationError(err string) error {
	return errors.New(err)
}

func isValidEmail(email string) bool {
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	return regexp.MustCompile(emailRegex).MatchString(email)
}

func isValidPassword(password string) bool {
	if len(password) < 8 {
		return false
	}

	hasUpperCase := regexp.MustCompile(`[A-Z]`).MatchString(password)
	if !hasUpperCase {
		return false
	}

	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
	if !hasNumber {
		return false
	}

	hasSpecialChar := regexp.MustCompile(`[!@#$^&*(),.?":{}|<>]`).MatchString(password)
	return hasSpecialChar
}

func UserValidations(user *models.User, password string, isRegister bool) error {
	if isRegister {
		if user.Username == "" {
			return validationError("Username is required")
		}
	}

	if user.Email == "" {
		return validationError("Email is required")
	}

	if !isValidEmail(user.Email) {
		return validationError("Invalid email")
	}

	if !isValidPassword(password) {
		return validationError("Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character")
	}
	return nil
}

func ValidateRegister(user *models.User, password string) error {
	return UserValidations(user, password, true)
}

func ValidateLogin(user *models.User, password string) error {
	return UserValidations(user, password, false)
}
