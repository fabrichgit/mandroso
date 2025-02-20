package helper

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Config struct {
	DefaultUser struct {
		ID        string `json:"_id"`
		Name      string `json:"name"`
		Email     string `json:"email"`
		Role      string `json:"role"`
		Available bool   `json:"available"`
		Password  string `json:"password"`
	} `json:"defaultUser"`
}

func LoadConfig() (Config, error) {
	var config Config
	file, err := os.Open("config.json")
	if err != nil {
		return config, err
	}
	defer file.Close()

	err = json.NewDecoder(file).Decode(&config)
	return config, err
}

func DeleteUser(w http.ResponseWriter, id string) (*mongo.DeleteResult, error) {
	collection, ctx, cancel := database.Collection(w, "users")

	if collection == nil || ctx == nil {
		return nil, errors.New("")
	}
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return nil, err
	}

	result, err := collection.DeleteOne(ctx, bson.M{"_id": objectID})

	return result, err
}

func FindUserById(w http.ResponseWriter, id string) (models.User, error) {
	collection, ctx, cancel := database.Collection(w, "users")
	defer cancel()

	var userFound models.User

	objectID, _ := primitive.ObjectIDFromHex(id)

	err := collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&userFound)

	return userFound, err
}

func HandleUsersEmpty() {

	client, err := database.GetMongoClient()
	if err != nil {
		log.Fatalf("Failed to get MongoDB client: %v", err)
	}

	collection := client.Database(os.Getenv("DATABASE_NAME")).Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	count, err := collection.CountDocuments(ctx, bson.M{})
	if err != nil {
		log.Fatalf("Erreur lors du comptage des documents : %v", err)
		return
	}

	if count == 0 {
		config, err := LoadConfig()
		if err != nil {
			log.Fatalf("Erreur de chargement de la configuration")
			return
		}

		objectID, err := primitive.ObjectIDFromHex(config.DefaultUser.ID)
		if err != nil {
			log.Fatalf("ID invalide")
			return
		}

		adminUser := bson.M{
			"_id":       objectID,
			"name":      config.DefaultUser.Name,
			"email":     config.DefaultUser.Email,
			"role":      config.DefaultUser.Role,
			"available": config.DefaultUser.Available,
			"password":  config.DefaultUser.Password,
		}

		_, err = collection.InsertOne(ctx, adminUser)
		if err != nil {
			log.Fatalf("Erreur lors de l'insertion de l'admin : %v", err)
		} else {
			fmt.Println("Utilisateur admin inséré avec succès.")
		}
	} else {
		fmt.Println("La collection users n'est pas vide.")
	}
}
