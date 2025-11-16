package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var DB *mongo.Database

func Connect() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using environment variables")
	}

	mongoURI := os.Getenv("MONGODB_URI")
	dbName := os.Getenv("DATABASE_NAME")

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("MongoDB Connection Error:", err)
	}

	// Ping the database to ensure connection is alive
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("MongoDB Ping Error:", err)
	}

	fmt.Println("Connected to MongoDB!")

	// Set global client and database
	Client = client
	DB = client.Database(dbName)
}
