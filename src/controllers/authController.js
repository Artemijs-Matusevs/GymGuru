import passport from 'passport';
import authService from '../services/authService.js';

const authController = {

    //Signing in with google
    googleAuth: (req, res, next) => {
        passport.authenticate('google', { scope: ['profile', 'email']})(req, res, next);
    },

    //Signing in locally
    localAuth: (req, res, next) => {
        passport.authenticate("local", {
            sucessRedirect: "/dashboard",
            failureRedirect: '/',
        })(req, res, next);
    },

    //Redirect after signing in with google
    googleCallback: (req, res, next) => {
        passport.authenticate('google', {
            successRedirect: "/dashboard",
            failureRedirect: '/',
        })(req, res, next);
    },

    //Register new local account
    newLocalUser: async (req, res) => {
        try{
            const result = await authService.newLocalUser(req.body);
            if (result === "no match") {
                res.status(400).json({ message: "Passwords don't match"});
            } else if (result === "user exists") {
                res.status(400).json({ message: "Email already in use"});
            } else {
                res.status(201).json({ message: "Account created"});
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error"});
            console.log(error);
        }
    },

    //Loging out
    logout: (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        })
    },

    //Authenticate protect dashboard
    dashboard: (req, res) => {
        if (req.isAuthenticated()) {
            res.send(req.user.email);
        }else {
            res.redirect("/");
        }
    }
};

//Exports
export default authController;