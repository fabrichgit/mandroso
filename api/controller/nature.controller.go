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
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddNature(w http.ResponseWriter, r *http.Request) {
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
		Name string `json:"name"`
	}

	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "nature")

	if ctx == nil || collection == nil {
		return
	}
	defer cancel()

	dataInsert := models.Nature{
		Name: data.Name,
	}

	result, err := collection.InsertOne(ctx, dataInsert)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func GetNature(w http.ResponseWriter, r *http.Request) {
	natures, err := helper.GetNatures(w)
	if err != nil {
		return
	}
	json.NewEncoder(w).Encode(natures)
}

func UpdateNature(w http.ResponseWriter, r *http.Request) {

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
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var updatedDt struct {
		Name     string `bson:"name"`
		Excepted int64  `bson:"excepted"`
	}

	if err := json.Unmarshal(body, &updatedDt); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "nature")
	if collection == nil || ctx == nil {
		http.Error(w, "Failed to connect to collection", http.StatusInternalServerError)
		return
	}
	defer cancel()

	id, _ := helper.GetQuery(r, "id")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusInternalServerError)
		return
	}

	updateFields := helper.GenerateUpdateFields(updatedDt)

	if len(updateFields) == 0 {
		http.Error(w, "No fields to update", http.StatusBadRequest)
		return
	}

	update := bson.D{{Key: "$set", Value: updateFields}}

	result, err := collection.UpdateByID(ctx, objectID, update)
	if err != nil {
		http.Error(w, "Failed to update password", http.StatusInternalServerError)
		return
	}

	if result.MatchedCount == 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(result)
}
