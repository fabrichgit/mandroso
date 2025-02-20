package helper

import (
	"errors"
	"net/http"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/models"

	"go.mongodb.org/mongo-driver/bson"
)

func GetRecette(w http.ResponseWriter) ([]models.TRecette, error) {
	recette, ctx, cancel := database.Collection(w, "recette")
	if recette == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return nil, errors.New("")
	}
	defer cancel()

	var recettes []models.TRecette
	cursor, err := recette.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	for cursor.Next(ctx) {
		var recette models.TRecette
		cursor.Decode(&recette)
		recettes = append(recettes, recette)
	}

	if recettes == nil {
		return []models.TRecette{}, nil
	}

	return recettes, nil
}
