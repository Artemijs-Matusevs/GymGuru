import passport from 'passport';

const authController = {

    //Signing in with google
    googleAuth: (req, res, next) => {
        passport.authenticate('google', { scope: ['profile', 'email']})(req, res, next);
    },

    //Redirect after signing in with google
    googleCallback: (req, res, next) => {
        passport.authenticate('google', {
            successRedirect: "/dashboard",
            failureRedirect: '/',
        })(req, res, next);
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