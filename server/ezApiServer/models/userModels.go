package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	UserID             string             `bson:"userID" json:"userID"`
	Name               string             `bson:"name" json:"name"`
	Email              string             `bson:"email" json:"email"`
	Password           string             `bson:"password" json:"password"`
	Role               string             `bson:"role" json:"role"`
	Token              string             `bson:"token" json:"token"`
	RefreshToken       string             `bson:"refreshToken" json:"refreshToken"`
	CreatedEndpointIDs []string           `bson:"createdEndpointIDs" json:"createdEndpointIDs"`
	CreatedAt          time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt          time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type LoginUser struct {
	Email    string `bson:"email" json:"email"`
	Password string `bson:"password" json:"password"`
}
