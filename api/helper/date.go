package helper

import "time"

func GetDate() string {
	formattedTime := time.Now().Format("2006-01-02 15:04:05")
	return formattedTime
}
