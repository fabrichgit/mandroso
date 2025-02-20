package controller

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/helper"
	"github.com/compta-onirtech/api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/dgrijalva/jwt-go"
)

func Depenser(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))

	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	if (*claims)["Role"] == "observateur" {
		http.Error(w, "", http.StatusUnauthorized)
		return
	}
	id, ok := (*claims)["Id"].(string)
	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	var dataAdd models.TAddDepense
	err = json.Unmarshal(body, &dataAdd)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "depense")

	if collection == nil || ctx == nil {
		return
	}
	defer cancel()

	now := helper.GetDate()

	depense := models.TDepense{
		Date:        now,
		Label:       dataAdd.Label,
		Amount:      dataAdd.Amount,
		Idetiquette: dataAdd.Idetiquette,
		Userid:      id,
		Status:      "novalid",
	}

	result, err := collection.InsertOne(ctx, depense)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	res, _ := json.Marshal(result)
	log.Println(res)
	// Archivein(w, models.TArchive{Date: now, Payload: strings., })

	json.NewEncoder(w).Encode(result)
}

func GetDepense(w http.ResponseWriter, r *http.Request) {

	depense, err := helper.GetDepense(w)
	if err != nil {
		return
	}
	json.NewEncoder(w).Encode(depense)
}

func UpdateValidD(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	if (*claims)["Role"] == "observateur" {
		http.Error(w, "", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	var data struct {
		Status string `json:"status"`
	}
	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "depense")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	defer cancel()

	id, _ := helper.GetQuery(r, "id")

	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		log.Println("id required")
		return
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.D{{Key: "$set", Value: data}})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func UpdateNatureD(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	if (*claims)["Role"] == "observateur" {
		http.Error(w, "", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	var data struct {
		Idnature string `json:"idnature"`
	}
	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "depense")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	defer cancel()

	id, _ := helper.GetQuery(r, "id")

	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		log.Println("id required")
		return
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.D{{Key: "$set", Value: data}})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func UpdateTresorD(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	if (*claims)["Role"] == "observateur" {
		http.Error(w, "", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	var data struct {
		Idtresor string `json:"idtresor"`
	}
	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "depense")

	if collection == nil || ctx == nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	defer cancel()

	id, _ := helper.GetQuery(r, "id")

	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	//

	_, err = collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.D{
		{Key: "$set", Value: bson.M{"status": "valid"}},
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	//

	result, err := collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.D{{Key: "$set", Value: data}})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}
