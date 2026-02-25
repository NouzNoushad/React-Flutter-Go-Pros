package utils

import (
	"errors"
	"regexp"
)

// validation error
func validationError(err string) error {
	return errors.New(err)
}

// validate password
func isValidPassword(password string) bool {
	// password length
	if len(password) < 8 {
		return false
	}

	// check if password contains at least one uppercase letter
	hasUpperCase := regexp.MustCompile(`[A-Z]`).MatchString(password)
	if !hasUpperCase {
		return false
	}

	// check if password contains atleast one number
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
	if !hasNumber {
		return false
	}

	// check if password contains atleast one special character
	hasSpecialCharacter := regexp.MustCompile(`[!@#$^&*(),.?":{}|<>]`).MatchString(password)
	return hasSpecialCharacter
}

// valid email
func isValidEmail(email string) bool {
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	return regexp.MustCompile(emailRegex).MatchString(email)
}

// account validation
func AccountValidation(username, email *string, password string) error {
	// username
	if username == nil || *username == "" {
		return validationError("Username is required")
	}

	if err := LoginValidation(email, password); err != nil {
		return err
	}

	return nil
}

// login validation
func LoginValidation(email *string, password string) error {

	// email
	if email == nil || *email == "" {
		return validationError("Email is required")
	}

	if !isValidEmail(*email) {
		return validationError("Invalid email")
	}

	// password
	if !isValidPassword(password) {
		return validationError("Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character")
	}

	return nil
}

// send email validation
func SendEmailValidation(email string) error {

	// email
	if email == "" {
		return validationError("Email is required")
	}

	if !isValidEmail(email) {
		return validationError("Invalid email")
	}

	return nil
}

// reset password validation
func ResetPasswordValidation(email string, password string, confirmPassword string) error {

	// email
	if email == "" {
		return validationError("Email is required")
	}

	if !isValidEmail(email) {
		return validationError("Invalid email")
	}

	// password
	if !isValidPassword(password) {
		return validationError("Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character")
	}

	// confirm password
	if confirmPassword != password {
		return validationError("Password do not match")
	}

	return nil
}
