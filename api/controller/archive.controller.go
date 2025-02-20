package controller

import (
	"errors"
	"net/http"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/models"
)

func Archivein(w http.ResponseWriter, data models.TArchive) error {

	collection, ctx, cancel := database.Collection(w, "archive")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return errors.New("")
	}
	defer cancel()

	_, err := collection.InsertOne(ctx, data)

	return err
}
