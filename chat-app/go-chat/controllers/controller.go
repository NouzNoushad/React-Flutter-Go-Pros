package controllers

import (
	"go-chat/repositories"
	"time"
)

type APIServer struct {
	storage repositories.Storage
}

func NewAPIServer(storage repositories.Storage) *APIServer {
	return &APIServer{
		storage: storage,
	}
}

const (
	Success string = "success"
	Failed  string = "failed"
)

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

type PaginationLink struct {
	URL    *string `json:"url"`
	Label  string  `json:"label"`
	Active bool    `json:"active"`
}

type PaginatedUsers struct {
	CurrentPage  int              `json:"current_page"`
	Data         []UserResponse   `json:"data"`
	Path         string           `json:"path"`
	Total        int64            `json:"total"`
	From         *int             `json:"from"`
	To           *int             `json:"to"`
	LastPage     int              `json:"last_page"`
	FirstPageURL string           `json:"first_page_url"`
	LastPageURL  string           `json:"last_page_url"`
	PrevPageURL  *string          `json:"prev_page_url"`
	NextPageURL  *string          `json:"next_page_url"`
	Links        []PaginationLink `json:"links"`
}

type UsersResponse struct {
	Status string         `json:"status"`
	Users  PaginatedUsers `json:"users"`
}

type UserByIDResponse struct {
	Status string       `json:"status"`
	User   UserResponse `json:"user"`
}

type CommonResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type Message struct {
	ID             string    `json:"id"`
	Type           string    `json:"type"`
	Sender         string    `json:"sender"`
	Room           string    `json:"room"`
	Content        string    `json:"content"`
	ReplyToMessage string    `json:"reply_to_message"`
	CreatedAt      time.Time `json:"created_at"`
}

type MessagesResponse struct {
	Status   string    `json:"status"`
	Messages []Message `json:"messages"`
}
