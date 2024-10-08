import passport from 'passport';
import authService from '../services/authService.js';

const authController = {

    //Signing in with google
    googleAuth: (req, res, next) => {
        passport.authenticate('google', { scope: ['profile', 'email']})(req, res, next);
    },

    //Signing in locally
    localAuth: (req, res, next) => {
        passport.authenticate("local", function(err, user, info) {
            if (err)
            {return next(err);}
            else if (!user) {
                //USER NOT FOUND
                return res.status(401).json({ message: info.message });
            }
            req.logIn(user, function(err) {
                if (err) {return next(err);}
                return res.redirect('/dashboard');
            });
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

    //Middleware to protect routes
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }else{
            res.redirect('/');
        }
    }
};

//Exports
export default authController;