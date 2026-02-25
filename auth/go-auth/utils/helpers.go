package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"go-auth/models"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

// string to bool
func StringToBool(value string) (bool, error) {
	return strconv.ParseBool(value)
}

// string to int
func StringToInt(value string) (*int, error) {
	v, err := strconv.Atoi(value)
	if err != nil {
		return nil, err
	}

	return &v, nil
}

// string to time
func StringToTime(value string) (*time.Time, error) {
	formats := []string{
		"2006-01-02",
		"02-01-2006",
		"2006/01/02",
		"02/01/2006",
	}
	for _, format := range formats {
		if t, err := time.Parse(format, value); err == nil {
			return &t, nil
		}
	}

	return nil, fmt.Errorf("invalid date format")
}

// generate slug
func GenerateSlug(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	s = strings.ReplaceAll(s, " ", "-")
	for strings.Contains(s, "--") {
		s = strings.ReplaceAll(s, "--", "-")
	}
	out := make([]rune, 0, len(s))
	for _, r := range s {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '-' {
			out = append(out, r)
		}
	}
	return string(out)
}

func StringPointer(s string) *string {
	return &s
}

func FilterEmpty(ids []string) []string {
	var cleaned []string
	for _, id := range ids {
		if id != "" {
			cleaned = append(cleaned, id)
		}
	}
	return cleaned
}

// hash password
func HashPassword(pw string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(pw), bcrypt.DefaultCost)
	return string(hash)
}

// validate password
func ValidatePassword(hash, pw string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(pw)) == nil
}

// hash refresh token
func HashRefreshToken(token string) string {
	hash := sha256.Sum256([]byte(token))
	hashToken := hex.EncodeToString(hash[:])
	return hashToken
}

// compare refresh token
func CompareRefreshToken(storedHash string, token string) bool {
	computedHash := HashRefreshToken(token)
	return computedHash == storedHash
}

// create JWT
func CreateJWT(user *models.User, duration time.Duration) (string, error) {
	claims := jwt.MapClaims{
		"user_id":   user.ID,
		"username":  user.Username,
		"email":     user.Email,
		"role":      user.Role,
		"expiresAt": time.Now().Add(duration).Unix(),
	}
	secret := os.Getenv("JWT_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// validate JWT
func ValidateJWT(tokenString string) (*jwt.Token, jwt.MapClaims, error) {
	secret := os.Getenv("JWT_SECRET")
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(secret), nil
	})

	if err != nil {
		return nil, nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, nil, fmt.Errorf("invalid token claims")
	}

	return token, claims, nil
}

func VerifyJWT(tokenString string) (jwt.MapClaims, error) {
	_, claims, err := ValidateJWT(tokenString)
	if err != nil {
		return nil, fmt.Errorf("failed to parse token: %w", err)
	}

	return claims, nil
}

// email token
func CreateEmailToken(email string) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(10 * time.Minute).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("EMAIL_JWT_SECRET")))
}

// verify email token
func VerifyEmailToken(tokenStr string) (*jwt.Token, jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("EMAIL_JWT_SECRET")), nil
	})

	if err != nil {
		return nil, nil, err
	}

	claims := token.Claims.(jwt.MapClaims)

	return token, claims, nil
}

func IsEmail(input string) bool {
	re := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return re.MatchString(input)
}
