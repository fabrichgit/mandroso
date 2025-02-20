package helper

import (
	"errors"
	"net/http"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetNatures(w http.ResponseWriter) ([]models.Nature, error) {
	collection, ctx, cancel := database.Collection(w, "nature")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return nil, errors.New("")
	}
	defer cancel()

	var natures []models.Nature
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	for cursor.Next(ctx) {
		var nature models.Nature
		cursor.Decode(&nature)
		natures = append(natures, nature)
	}

	if natures == nil {
		return []models.Nature{}, nil
	}

	return natures, nil
}
