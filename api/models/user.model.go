package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Name      string             `bson:"name"`
	Avatar    string             `bson:"avatar"`
	Email     string             `bson:"email"`
	Role      string             `bson:"role"`
	Available bool               `bson:"available"`
	Password  string             `bson:"password"`
}
