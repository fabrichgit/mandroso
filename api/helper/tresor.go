package helper

import (
	"errors"
	"net/http"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetTresor(w http.ResponseWriter) ([]models.Tresor, error) {
	collection, ctx, cancel := database.Collection(w, "tresor")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return nil, errors.New("")
	}
	defer cancel()

	var tresors []models.Tresor
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	for cursor.Next(ctx) {
		var tresor models.Tresor
		cursor.Decode(&tresor)
		tresors = append(tresors, tresor)
	}

	if tresors == nil {
		return []models.Tresor{}, nil
	}

	return tresors, nil
}
