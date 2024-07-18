import express from "express";
import pg from "pg";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth2";
import passport from "passport";
import session from "express-session";

//Configure app and port
const app = express();
const port = 3000;

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


//Setting up middleware
app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

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
    successRedirect: "/dashboard",
    failureRedirect: "/"
}))

app.get("/dashboard", (req, res) => {
    //console.log(req.user);
    res.send(req.user.email);
})

// log-out endpoint
app.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
})



//Configure google strategy module
passport.use("google", new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: "http://localhost:3000/auth/google/dashboard",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
},
async (accessToken, refreshTokn, profile, cb) => {
    //console.log(profile);
    try{
        //Query the database to see if the google email exists in the users table
        const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
        //If the result is empty, add user to the users table.
        //Store password as "Google" to know that user signed in with google
        if (result.rows.length === 0) {
            const newUser = await db.query("INSERT INTO USERS (email, password) VALUES ($1, $2)", [profile.email, "google"])
            cb(null, newUser.rows[0]);
        } else{
            //User already exists
            cb(null, result.rows[0]);
        }
    } catch(err) {
        cb(err);
    }
}))

//serialize and deserialize user
passport.serializeUser((user, cb) => {
    cb(null, user.id);
})

passport.deserializeUser(async (id, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        cb(null, result.rows[0]);
    } catch (err) {
        cb(err);
    }
})


//Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})