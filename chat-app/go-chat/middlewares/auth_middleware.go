package middlewares

import (
	"go-chat/repositories"
	"go-chat/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

const (
	Success          string = "success"
	Failed           string = "failed"
	PermissionDenied string = "permission denied"
)

type ErrorResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func AuthMiddleware(store repositories.Storage) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		tokenStr := ""
		var err error
		if after, ok := strings.CutPrefix(authHeader, "Bearer "); ok {
			tokenStr = after
		}

		// validate token
		token, err := utils.ValidateJWT(tokenStr)
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusForbidden, ErrorResponse{
				Status:  Failed,
				Message: PermissionDenied,
			})
			return
		}

		// claim token
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, ErrorResponse{
				Status:  Failed,
				Message: PermissionDenied,
			})
			return
		}

		userId, ok := claims["user_id"].(string)
		if !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, ErrorResponse{
				Status:  Failed,
				Message: PermissionDenied,
			})
			return
		}

		user, err := store.GetUserByID(userId)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, ErrorResponse{
				Status:  Failed,
				Message: PermissionDenied,
			})
			return
		}

		c.Set("user", user)

		c.Next()
	}
}
