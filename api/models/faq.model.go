package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TFaq struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Description string             `json:"description"`
	Type        string             `json:"type"`
	Userid      string             `json:"userid"`
	Date        string             `json:"date"`
}
