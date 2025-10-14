package utils

import (
	"fmt"
	"go-chat/models"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func GenerateID() string {
	return uuid.New().String()
}

func ParseToInt(s string) int {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0
	}
	return n
}

func HashCredential(credential string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(credential), bcrypt.DefaultCost)
	return string(hash)
}

func ValidateCredential(hash, credential string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(credential)) == nil
}

func CreateJWT(user *models.User, duration time.Duration) (string, error) {
	claims := jwt.MapClaims{
		"username":  user.Username,
		"email":     user.Email,
		"expiresAt": time.Now().Add(duration).Unix(),
	}
	secret := os.Getenv("JWT_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func ValidateJWT(token string) (*jwt.Token, error) {
	secret := os.Getenv("JWT_SECRET")
	return jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(secret), nil
	})
}
