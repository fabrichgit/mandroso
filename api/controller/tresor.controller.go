package controller

import (
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/helper"
	"github.com/compta-onirtech/api/models"
	"github.com/dgrijalva/jwt-go"
)

func AddTresor(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))

	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)

	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if (*claims)["Role"] != "admin" {
		http.Error(w, "", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	var data struct {
		Name     string `json:"name"`
		Category string `json:"category"`
	}

	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "tresor")

	if ctx == nil || collection == nil {
		return
	}
	defer cancel()

	dataInsert := models.Tresor{
		Name:     data.Name,
		Category: data.Category,
	}

	result, err := collection.InsertOne(ctx, dataInsert)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func GetTresor(w http.ResponseWriter, r *http.Request) {
	natures, err := helper.GetTresor(w)
	if err != nil {
		return
	}
	json.NewEncoder(w).Encode(natures)
}
