package utils

import (
	"errors"
	"go-todo/models"
)

func validationError(err string) error {
	return errors.New(err)
}

func TodoValidation(todo *models.Todo) error {
	if todo.Title == "" {
		return validationError("Title is required")
	}

	return nil
}
