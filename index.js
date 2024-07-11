import express from "express";
import pg from "pg";
import env from "dotenv";

//Initialize enviromental variables file
env.config();

//Set up/connect to database
const db = new pg.Client({
    user: "username",
    host: "localhost",
    database: "GymGuru",
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
});

const app = express();
const port = 3000;

//Setting up middleware
app.use(express.static("public"));

//End points
app.get("/", (req, res) => {
    res.render("index.ejs");
})

//Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})