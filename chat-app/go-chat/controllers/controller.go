package controllers

import "go-chat/repositories"

type APIServer struct {
	storage repositories.Storage
}

func NewAPIServer(storage repositories.Storage) *APIServer {
	return &APIServer{
		storage: storage,
	}
}

type ErrorResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type UserResponse struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type RegisterResponse struct {
	Status       string       `json:"status"`
	Message      string       `json:"message"`
	User         UserResponse `json:"user"`
	AccessToken  string       `json:"access_token"`
	RefreshToken string       `json:"refresh_token"`
}

type RefreshTokenResponse struct {
	Status       string `json:"status"`
	Message      string `json:"message"`
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type UsersResponse struct {
	Status string         `json:"status"`
	Users  []UserResponse `json:"users"`
	Total  string         `json:"total"`
}

type UserByIDResponse struct {
	Status string       `json:"status"`
	User   UserResponse `json:"user"`
}

type CommonResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}
