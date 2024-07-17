import express from "express";
import pg from "pg";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth2";
import passport from "passport";

//Initialize enviromental variables file
env.config();

//Set up database credentials
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "GymGuru",
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
});

db.connect();//Connect to the database

const app = express();
const port = 3000;

//Setting up middleware
app.use(express.static("public"));

// --- End points ---
app.get("/", (req, res) => {
    res.render("index.ejs");
})

// sign-in with google oauth
app.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
)

// redirect after signing in with google
app.get("/auth/google/dashboard", passport.authenticate("google", {
    sucessRedirect: "/dashboard",
    failureRedirect: "/"
}))

// log-out endpoint
app.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
})

//Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

//Configure google strategy module
passport.use("google", new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: "http://localhost:3000/auth/google/dashboard",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
},
async (accessToken, refreshTokn, profile, cb) => {
    console.log(profile);
}))