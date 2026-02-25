package controllers

import (
	"go-auth/repositories"

	"golang.org/x/oauth2"
)

type APIServer struct {
	storage           repositories.Storage
	googleOAuthConfig *oauth2.Config
}

func NewAPIServer(storage repositories.Storage, auth *oauth2.Config) *APIServer {
	return &APIServer{
		storage:           storage,
		googleOAuthConfig: auth,
	}
}

const (
	Success string = "success"
	Failed  string = "failed"
)

type ErrorResponse struct {
	Status  string `json:"status"`
	Message string `json:"error"`
}

type SuccessResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type AuthResponse struct {
	Status       string `json:"status"`
	Message      string `json:"message"`
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type AuthCheckResponse struct {
	Status   string `json:"status"`
	LoggedIn bool   `json:"logged_in"`
	UserID   string `json:"user_id"`
	Role     string `json:"role"`
}
