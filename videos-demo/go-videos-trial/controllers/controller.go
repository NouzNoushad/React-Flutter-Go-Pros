package controllers

import "go-videos-trial/repository"

type APIServer struct {
	storage repository.Storage
}

func NewAPIServer(storage repository.Storage) *APIServer {
	return &APIServer{
		storage: storage,
	}
}
