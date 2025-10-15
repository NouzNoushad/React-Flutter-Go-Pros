package controllers

import (
	"fmt"
	"math"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// get users
func (s *APIServer) HandleGetUsers(c *gin.Context) {
	DEFAULT_PAGE := "1"
	DEFAULT_LIMIT := "10"

	page, _ := strconv.Atoi(c.DefaultQuery("page", DEFAULT_PAGE))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", DEFAULT_LIMIT))
	search := c.DefaultQuery("search", "")

	users, total, err := s.storage.GetUsers(search, page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error(),
		})
		return
	}

	usersResponse := make([]UserResponse, 0, len(*users))
	for _, u := range *users {
		usersResponse = append(usersResponse, UserResponse{
			ID:    u.ID,
			Name:  u.Username,
			Email: u.Email,
		})
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))
	basePath := c.Request.URL.Path
	fullPath := fmt.Sprintf("%s?limit=%d", basePath, limit)
	from := (page-1)*limit + 1
	if from > int(total) {
		from = 0
	}
	to := (page-1)*limit + len(usersResponse)
	if to > int(total) {
		to = 0
	}

	// url
	firstPageURL := fmt.Sprintf("%s&page=%d", fullPath, 1)
	lastPageURL := fmt.Sprintf("%s&page=%d", fullPath, totalPages)
	var prevPageURL, nextPageURL *string
	if page > 1 {
		url := fmt.Sprintf("%s&page=%d", fullPath, page-1)
		prevPageURL = &url
	}
	if page < totalPages {
		url := fmt.Sprintf("%s&page=%d", fullPath, page+1)
		nextPageURL = &url
	}

	// links
	links := []PaginationLink{}

	// previous link
	if page > 1 {
		url := fmt.Sprintf("%s&page=%d", fullPath, page-1)
		links = append(links, PaginationLink{
			URL:    &url,
			Label:  "Previous",
			Active: false,
		})
	} else {
		links = append(links, PaginationLink{
			URL:    nil,
			Label:  "Previous",
			Active: false,
		})
	}

	// b/w links
	for i := 1; i <= totalPages; i++ {
		url := fmt.Sprintf("%s&page=%d", fullPath, i)
		links = append(links, PaginationLink{
			URL:    &url,
			Label:  strconv.Itoa(i),
			Active: i == page,
		})
	}

	// next link
	if page < totalPages {
		url := fmt.Sprintf("%s&page=%d", fullPath, page+1)
		links = append(links, PaginationLink{
			URL:    &url,
			Label:  "Next",
			Active: false,
		})
	} else {
		links = append(links, PaginationLink{
			URL:    nil,
			Label:  "Next",
			Active: false,
		})
	}

	c.JSON(http.StatusOK, UsersResponse{
		Status: Success,
		Users: PaginatedUsers{
			CurrentPage:  page,
			Data:         usersResponse,
			Path:         basePath,
			Total:        total,
			From:         &from,
			To:           &to,
			LastPage:     totalPages,
			FirstPageURL: firstPageURL,
			LastPageURL:  lastPageURL,
			PrevPageURL:  prevPageURL,
			NextPageURL:  nextPageURL,
			Links:        links,
		},
	})
}

// get user by id
func (s *APIServer) HandleGetUserByID(c *gin.Context) {
	id := c.Param("id")

	user, err := s.storage.GetUserByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, UserByIDResponse{
		Status: Success,
		User: UserResponse{
			ID:    user.ID,
			Name:  user.Username,
			Email: user.Email,
		},
	})
}

// delete user
func (s *APIServer) HandleDeleteUser(c *gin.Context) {
	id := c.Param("id")

	user, err := s.storage.GetUserByID(id)
	if err != nil || user == nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Status:  Failed,
			Message: "User not found",
		})
		return
	}

	if err := s.storage.DeleteUser(user.ID); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Status:  Failed,
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, CommonResponse{
		Status:  Success,
		Message: "User removed",
	})
}
