package utils

import (
	"crypto/sha256"
	"encoding/hex"
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

func HashRefreshToken(token string) string {
	hash := sha256.Sum256([]byte(token))
	hashToken := hex.EncodeToString(hash[:])
	return hashToken
}

func CompareRefreshToken(storedHash string, token string) bool {
	computedHash := HashRefreshToken(token)
	return computedHash == storedHash
}

func CreateJWT(user *models.User, duration time.Duration) (string, error) {
	claims := jwt.MapClaims{
		"user_id":   user.ID,
		"username":  user.Username,
		"email":     user.Email,
		"expiresAt": time.Now().Add(duration).Unix(),
		"iat":       time.Now().Unix(),
	}
	secret := os.Getenv("JWT_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func ValidateJWT(tokenString string) (*jwt.Token, error) {
	secret := os.Getenv("JWT_SECRET")
	return jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(secret), nil
	})
}

func VerifyJWT(tokenString string) (jwt.MapClaims, error) {
	token, err := ValidateJWT(tokenString)
	if err != nil {
		return nil, fmt.Errorf("failed to parse token: %w", err)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}
