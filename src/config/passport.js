import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import authService from '../services/authService.js';
import dotenv from 'dotenv';

//Load enviroment variables
dotenv.config();



//Configure google strategy module
passport.use("google", new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: "http://localhost:3000/auth/google/dashboard",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
},
async (accessToken, refreshTokn, profile, cb) => {
    try{
        const user = await authService.newGoogleUser(profile);
        cb(null, user);
    } catch (err) {
        console.error("Error in Google Strategy:", err);
        cb(err);
    }
}))

//Configure local strategy module
/*passport.use(new Strategy(async function verify(username, password, cb) {
    try {

    }
}))*/




//serialize and deserialize user
passport.serializeUser((user, cb) => {
    cb(null, user.id);
})

passport.deserializeUser(async (id, cb) => {
    try{
        const user = await authService.getUserById(id);
        cb(null, user);
    }catch(err){
        console.error("Error in deserializing user:", err);
        cb(err);
    }
})


//Exports
export default passport;