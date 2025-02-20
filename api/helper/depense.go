package helper

import (
	"errors"
	"net/http"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/models"

	"go.mongodb.org/mongo-driver/bson"
)

func GetDepense(w http.ResponseWriter) ([]models.TDepense, error) {
	collection, ctx, cancel := database.Collection(w, "depense")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return nil, errors.New("")
	}
	defer cancel()

	var depenses []models.TDepense
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	for cursor.Next(ctx) {
		var depense models.TDepense
		cursor.Decode(&depense)
		depenses = append(depenses, depense)
	}

	if depenses == nil {
		return []models.TDepense{}, nil
	}

	return depenses, nil
}
