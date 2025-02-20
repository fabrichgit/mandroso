package helper

import (
	"errors"
	"net/http"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetEtiquettes(w http.ResponseWriter) ([]models.Etiquette, error) {
	collection, ctx, cancel := database.Collection(w, "etiquette")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return nil, errors.New("")
	}
	defer cancel()

	var etiquettes []models.Etiquette
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	for cursor.Next(ctx) {
		var etiquette models.Etiquette
		cursor.Decode(&etiquette)
		etiquettes = append(etiquettes, etiquette)
	}

	if etiquettes == nil {
		return []models.Etiquette{}, nil
	}

	return etiquettes, nil
}
