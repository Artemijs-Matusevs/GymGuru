import express from "express";

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