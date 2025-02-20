package helper

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"log"
	"mime/multipart"
	"net/smtp"
	"os"
)

func SendEmail(to string, msg string) error {
	// Set up authentication information
	auth := smtp.PlainAuth("", os.Getenv("SMTP_USER"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_DOMAIN"))

	// Use SMTP_USER as the sender's address
	err := smtp.SendMail(os.Getenv("SMTP_DOMAIN")+":"+os.Getenv("SMTP_PORT"), auth, os.Getenv("SMTP_USER"), []string{to}, []byte(msg))

	if err != nil {
		log.Println(err.Error())
		return err
	}

	log.Println("Email sent successfully!")
	return nil
}

func SendEmailWithAttachment(to, subject, body string, fileBytes []byte, fileName string) error {
	// Encoder le fichier en base64
	encodedFile := base64.StdEncoding.EncodeToString(fileBytes)

	// Construire le message MIME
	var buffer bytes.Buffer
	writer := multipart.NewWriter(&buffer)

	// En-têtes
	buffer.WriteString(fmt.Sprintf("To: %s\r\n", to))
	buffer.WriteString(fmt.Sprintf("Subject: %s\r\n", subject))
	buffer.WriteString("MIME-Version: 1.0\r\n")
	buffer.WriteString(fmt.Sprintf("Content-Type: multipart/mixed; boundary=%s\r\n", writer.Boundary()))
	buffer.WriteString("\r\n")

	// Partie texte
	textPart, _ := writer.CreatePart(map[string][]string{
		"Content-Type": {"text/plain; charset=\"utf-8\""},
	})
	textPart.Write([]byte(body))

	// Partie pièce jointe
	attachmentPart, _ := writer.CreatePart(map[string][]string{
		"Content-Type":              {"application/octet-stream"},
		"Content-Disposition":       {fmt.Sprintf("attachment; filename=\"%s\"", fileName)},
		"Content-Transfer-Encoding": {"base64"},
	})
	attachmentPart.Write([]byte(encodedFile))

	// Fermer le writer pour finaliser le message MIME
	writer.Close()

	// Paramètres SMTP
	auth := smtp.PlainAuth("", os.Getenv("SMTP_USER"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_DOMAIN"))
	smtpAddr := fmt.Sprintf("%s:%s", os.Getenv("SMTP_DOMAIN"), os.Getenv("SMTP_PORT"))

	// Envoyer l'email
	err := smtp.SendMail(smtpAddr, auth, os.Getenv("SMTP_USER"), []string{to}, buffer.Bytes())
	if err != nil {
		log.Println("Failed to send email:", err)
		return err
	}

	log.Println("Email with attachment sent successfully!")
	return nil
}

func SendEmailWithoutAttachment(to, subject, body string) error {
	// Construire le message texte simple
	message := fmt.Sprintf("To: %s\r\nSubject: %s\r\n\r\n%s", to, subject, body)

	// Paramètres SMTP
	auth := smtp.PlainAuth("", os.Getenv("SMTP_USER"), os.Getenv("SMTP_PASSWORD"), os.Getenv("SMTP_DOMAIN"))
	smtpAddr := fmt.Sprintf("%s:%s", os.Getenv("SMTP_DOMAIN"), os.Getenv("SMTP_PORT"))

	// Envoyer l'email
	err := smtp.SendMail(smtpAddr, auth, os.Getenv("SMTP_USER"), []string{to}, []byte(message))
	if err != nil {
		log.Println("Failed to send email without attachment:", err)
		return err
	}

	log.Println("Email without attachment sent successfully!")
	return nil
}
