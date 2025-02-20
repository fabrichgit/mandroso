package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/helper"
	"github.com/compta-onirtech/api/models"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
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

	if (*claims)["Role"] != "admin" {
		http.Error(w, "", http.StatusUnauthorized)
		return
	}

	collection, ctx, cancel := database.Collection(w, "users")

	if collection == nil || ctx == nil {
		return
	}
	defer cancel()

	var users []models.User

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	for cursor.Next(ctx) {
		var user models.User
		cursor.Decode(&user)
		users = append(users, user)
	}
	if cursor.Err() != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}

func GetOne(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)

	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	id, ok := (*claims)["Id"].(string)
	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	userFound, _ := helper.FindUserById(w, id)

	json.NewEncoder(w).Encode(userFound)
}

type AuthRequest struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

func Login(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)

	if err != nil {
		http.Error(res, "", http.StatusBadRequest)
		return
	}

	defer req.Body.Close()

	var loginReq AuthRequest
	err = json.Unmarshal(body, &loginReq)

	if err != nil {
		http.Error(res, "", http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(res, "users")
	if collection == nil || ctx == nil {
		return
	}
	defer cancel()

	var userFound models.User

	err = collection.FindOne(ctx, bson.D{{Key: "name", Value: loginReq.Name}}).Decode(&userFound)

	if err != nil {
		http.Error(res, err.Error(), http.StatusBadRequest)
		return
	}

	if userFound.Available && helper.CheckPasswordHash(loginReq.Password, userFound.Password) {
		token := struct {
			Token string
		}{
			Token: helper.GenerateJWT(userFound.ID, userFound.Role, time.Now().Add(24*time.Hour)),
		}
		json.NewEncoder(res).Encode(token)
		return
	}

	http.Error(res, "", http.StatusUnauthorized)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {

	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
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
		Role     string `json:"role"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	subject := "Contact Form Submission"

	body_ := fmt.Sprintf("username: %s\npassword: %s", data.Name, data.Password)

	msg := "To: " + data.Email + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		body_

	err = helper.SendEmail(data.Email, msg)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data.Password = helper.HashPassword(data.Password)

	collection, ctx, cancel := database.Collection(w, "users")

	if ctx == nil || collection == nil {
		return
	}
	defer cancel()

	dataInsert := models.User{
		Name:      data.Name,
		Role:      data.Role,
		Email:     data.Email,
		Password:  data.Password,
		Available: true,
	}

	result, err := collection.InsertOne(ctx, dataInsert)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {

	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	if (*claims)["Role"] != "admin" {
		http.Error(w, "", http.StatusUnauthorized)
		return
	}

	id, _ := helper.GetQuery(r, "id")

	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}

	result, err := helper.DeleteUser(w, id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token, _ := helper.GetToken(w, r)
	err = helper.DeconnectJWT(w, token)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func UpdatePass(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	id, ok := (*claims)["Id"].(string)
	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var updatedDt struct {
		Password string `json:"password"`
	}
	if err := json.Unmarshal(body, &updatedDt); err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updatedDt.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}
	updatedDt.Password = string(hashedPassword)

	collection, ctx, cancel := database.Collection(w, "users")
	if collection == nil || ctx == nil {
		http.Error(w, "Failed to connect to collection", http.StatusInternalServerError)
		return
	}
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusInternalServerError)
		return
	}

	update := bson.D{{Key: "$set", Value: bson.D{{Key: "password", Value: updatedDt.Password}}}}
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

func UpdateAvatar(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	id, ok := (*claims)["Id"].(string)
	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var updatedDt models.User
	if err := json.Unmarshal(body, &updatedDt); err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "users")
	if collection == nil || ctx == nil {
		http.Error(w, "Failed to connect to collection", http.StatusInternalServerError)
		return
	}
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusInternalServerError)
		return
	}

	updateFields := helper.GenerateUpdateFields(updatedDt)
	log.Println(updateFields)

	// Vérifier s'il y a des champs à mettre à jour
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

func UpdateByAdmin(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

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
		Name  string `bson:"name"`
		Email string `bson:"email"`
		Role  string `bson:"role"`
	}

	if err := json.Unmarshal(body, &updatedDt); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "users")
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

	user, _ := helper.FindUserById(w, id)

	updateFields := helper.GenerateUpdateFields(updatedDt)

	// Vérifier s'il y a des champs à mettre à jour
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

	userl, _ := helper.FindUserById(w, id)

	subject := "Update Information"

	body_ := fmt.Sprintf("username: %s\nemail: %s\nrole: %s", userl.Name, userl.Email, userl.Role)

	msg := "To: " + user.Email + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		body_

	err = helper.SendEmail(user.Email, msg)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func AskResetPass(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	id, ok := (*claims)["Id"].(string)
	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token := helper.GenerateJWT(objectID, (*claims)["Role"].(string), time.Now().Add(15*time.Minute))

	link := os.Getenv("ORIGIN_URL") + "/reset_password?token=" + token

	userfound, _ := helper.FindUserById(w, id)

	subject := "Reset Password"

	msg := "Subject: " + subject + "\r\n" +
		"\r\n" + "Click le lien pour reinitialiser le mot de passe" + "\n" +
		link

	err = helper.SendEmail(userfound.Email, msg)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode("OK")
}

func UpdateStatus(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value("jwtClaims").(*jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to get claims", http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
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

	var statusDt struct {
		Available bool `json:"available"`
	}
	err = json.Unmarshal(body, &statusDt)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "users")

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

	result, err := collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.D{{Key: "$set", Value: statusDt}})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}
