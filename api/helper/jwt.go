package helper

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/compta-onirtech/api/database"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var JwtKey = []byte(os.Getenv("JWT_SECRET"))

type Claims struct {
	Id   string `json:"Id"`
	Role string `json:"Role"`
	jwt.RegisteredClaims
}

func GetToken(w http.ResponseWriter, r *http.Request) (string, error) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return "", errors.New("missing authorization header")
	}

	tokenString := strings.Split(authHeader, " ")[1]

	return tokenString, nil
}

func GenerateJWT(id primitive.ObjectID, role string, expirationTime time.Time) string {

	// expirationTime := time.Now().Add(24 * time.Hour)

	claims := &Claims{
		Id:   id.Hex(),
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		return ""
	}

	return tokenString
}

func ValidateJWT(tokenString string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return JwtKey, nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	return claims, nil
}

func GetPayload(w http.ResponseWriter, r *http.Request) (*jwt.MapClaims, error) {
	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return nil, fmt.Errorf("failed to get claims")
	}

	// id, ok := (*claims)["Id"].(string)
	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return nil, fmt.Errorf("ID not found in token")
	}

	return claims, nil
}

func DeconnectJWT(w http.ResponseWriter, token string) error {
	collection, ctx, cancel := database.Collection(w, "notoken")

	if collection == nil || ctx == nil {
		return errors.New("")
	}
	defer cancel()

	_, err := collection.InsertOne(ctx, bson.M{"token": token})

	return err
}
