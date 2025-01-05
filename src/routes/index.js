//HANDLE ROOT ROUTE
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) =>{
    //Ceck if a user is logged in
    if(req.user){
        res.redirect("/dashboard");
    }else{
        res.render('index.ejs');
    }
});

export default router;