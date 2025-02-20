package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/compta-onirtech/api/database"
	"github.com/compta-onirtech/api/helper"
	"github.com/compta-onirtech/api/models"
	"github.com/dgrijalva/jwt-go"
)

func Send(w http.ResponseWriter, r *http.Request) {
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

	var dataAdd models.TFaq
	err = json.Unmarshal(body, &dataAdd)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	collection, ctx, cancel := database.Collection(w, "faq")

	if collection == nil || ctx == nil {
		return
	}
	defer cancel()

	faq := models.TFaq{
		Description: dataAdd.Description,
		Type:        dataAdd.Type,
		Userid:      id,
		Date:        helper.GetDate(),
	}

	result, err := collection.InsertOne(ctx, faq)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user, err := helper.FindUserById(w, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	subject := "Compta - " + dataAdd.Type

	body_ := fmt.Sprintf("user: %s\n, Description: %s\n", user.Email, dataAdd.Description)

	msg := "Subject: " + subject + "\r\n" + "\r\n" + body_

	helper.SendEmail("hei.fabrich.2@gmail.com", msg)
	helper.SendEmail("contact@onirtech.com", msg)

	json.NewEncoder(w).Encode(result)
}

func UploadHandler(w http.ResponseWriter, r *http.Request) {
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

	id, ok := (*claims)["Id"].(string)
	if !ok {
		http.Error(w, "ID not found in token", http.StatusUnauthorized)
		return
	}

	// Parse la requête multipart/form-data
	err := r.ParseMultipartForm(10 << 20) // Limite : 10 Mo
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	user, err := helper.FindUserById(w, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Récupérer le texte du message
	message := fmt.Sprintf("from: %s\n %s", user.Email, r.FormValue("message"))

	typee := r.FormValue("type")
	if message == "" || typee == "" {
		http.Error(w, "Message text is required", http.StatusBadRequest)
		return
	}

	// Récupérer le fichier image (optionnel)
	file, fileHeader, err := r.FormFile("file")
	hasFile := err == nil
	var fileBytes []byte
	var fileName string

	if hasFile {
		defer file.Close()
		// Lire le contenu du fichier
		fileBytes, err = io.ReadAll(file)
		if err != nil {
			http.Error(w, "Unable to read file", http.StatusInternalServerError)
			return
		}
		fileName = fileHeader.Filename
	}

	// Appeler la fonction pour envoyer l'email
	if hasFile {
		err = helper.SendEmailWithAttachment("hei.fabrich.2@gmail.com", "Report Compta -"+typee, message, fileBytes, fileName)
	} else {
		err = helper.SendEmailWithoutAttachment("hei.fabrich.2@gmail.com", "Report Compta -"+typee, message)
	}

	if err != nil {
		http.Error(w, "Unable to send email", http.StatusInternalServerError)
		return
	}

	if hasFile {
		err = helper.SendEmailWithAttachment("contact@onirtech.com", "Report Compta -"+typee, message, fileBytes, fileName)
	} else {
		err = helper.SendEmailWithoutAttachment("contact@onirtech.com", "Report Compta -"+typee, message)
	}

	if err != nil {
		http.Error(w, "Unable to send email", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Email sent successfully!"))
}
