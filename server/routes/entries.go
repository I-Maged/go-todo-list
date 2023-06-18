package routes

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/I-Maged/go-todo-list/server/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"go.mongodb.org/mongo-driver/mongo"
)

var todoCollection *mongo.Collection = OpenCollection(Client, "TodoList")

func GetTodos(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	var entries []bson.M
	cursor, err := todoCollection.Find(ctx, bson.M{})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	if err = cursor.All(ctx, &entries); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	fmt.Println(entries)
	c.JSON(http.StatusOK, entries)
}

func AddTodo(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	var todo models.TodoModel

	if err := c.BindJSON(&todo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	result, insertErr := todoCollection.InsertOne(ctx, todo)
	if insertErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Todo entry was not added"})
		fmt.Println(insertErr)
		return
	}

	c.JSON(http.StatusOK, result)
}

func UpdateTodo(c *gin.Context) {
	todoID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(todoID)
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	var todo models.TodoModel

	if err := c.BindJSON(&todo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	filter := bson.M{"_id": docID}
	update := bson.M{
		"title":   todo.Title,
		"subject": todo.Subject,
	}

	result, err := todoCollection.ReplaceOne(
		ctx,
		filter,
		update,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, result.ModifiedCount)
}
