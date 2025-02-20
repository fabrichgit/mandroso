package database

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var clientInstance *mongo.Client
var clientInstanceError error
var mongoOnce sync.Once

const timeout = 10 * time.Second

// GetMongoClient retourne une instance unique du client MongoDB
func GetMongoClient() (*mongo.Client, error) {
	mongoOnce.Do(func() {
		log.Println("Connecting to MongoDB...")
		ctx, cancel := context.WithTimeout(context.Background(), timeout)
		defer cancel()

		clientOptions := options.Client().ApplyURI(os.Getenv("DATABASE_URL"))
		clientInstance, clientInstanceError = mongo.Connect(ctx, clientOptions)
		if clientInstanceError != nil {
			log.Fatal(clientInstanceError)
		}

		// Vérifier la connexion
		err := clientInstance.Ping(ctx, nil)
		if err != nil {
			log.Fatal("Failed to connect to MongoDB:", err)
		}

		log.Println("Connected once")
	})
	return clientInstance, clientInstanceError
}

// Connexion à la base MongoDB
func ConnectDB() (*mongo.Client, error) {
	clientOptions := options.Client().ApplyURI(os.Getenv("DATABASE_URL"))
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	}
	fmt.Println("Connexion à MongoDB réussie!")

	return client, nil
}

func Collection(w http.ResponseWriter, collcetionName string) (*mongo.Collection, context.Context, context.CancelFunc) {
	client, err := GetMongoClient()
	if err != nil {
		log.Fatalf("Failed to get MongoDB client: %v", err)
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return nil, nil, nil
	}
	collection := client.Database(os.Getenv("DATABASE_NAME")).Collection(collcetionName)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	return collection, ctx, cancel
}

func Seed() {

}
