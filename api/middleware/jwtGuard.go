package middleware

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/helper"
	"github.com/compta-onirtech/api/models"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func JwtGuard(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		tokenString := strings.Split(authHeader, " ")[1]
		claims := &jwt.MapClaims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return helper.JwtKey, nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		id, ok := (*claims)["Id"].(string)
		if !ok {
			http.Error(w, "ID not found in token", http.StatusUnauthorized)
			return
		}

		collection, ctx, cancel := database.Collection(w, "users")
		defer cancel()

		var userFound models.User

		objectID, _ := primitive.ObjectIDFromHex(id)

		err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&userFound)

		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}
		if !userFound.Available {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		collection, ctx, cancel = database.Collection(w, "notoken")

		defer cancel()

		var tokenFound struct {
			ID    primitive.ObjectID `bson:"_id,omitempty"`
			Token string             `bson:"token"`
		}
		err = collection.FindOne(ctx, bson.M{"token": tokenString}).Decode(&tokenFound)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx = context.WithValue(r.Context(), "jwtClaims", claims)
				next.ServeHTTP(w, r.WithContext(ctx))
				return
			}
		} else {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		ctx = context.WithValue(r.Context(), "jwtClaims", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
