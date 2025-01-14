const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://harshalprince03:<db_password>@carboncredits.rqab5.mongodb.net/?retryWrites=true&w=majority&appName=carboncredits"; // Replace with your Atlas connection string
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");
        return client.db("carbon_credits"); // Replace with your database name
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;
