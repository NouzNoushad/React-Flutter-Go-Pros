package utils

import (
	"strconv"

	"github.com/google/uuid"
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
