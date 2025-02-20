package helper

import (
	"reflect"

	"go.mongodb.org/mongo-driver/bson"
)

func GenerateUpdateFields(data interface{}) bson.D {
	updateFields := bson.D{}

	val := reflect.ValueOf(data)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}

	for i := 0; i < val.NumField(); i++ {
		field := val.Field(i)
		fieldType := val.Type().Field(i)
		fieldName := fieldType.Tag.Get("bson") // Utilise le tag BSON comme clé

		// Ignorer les champs sans tags BSON ou vides
		if fieldName == "" || field.IsZero() {
			continue
		}

		updateFields = append(updateFields, bson.E{Key: fieldName, Value: field.Interface()})
	}

	return updateFields
}
