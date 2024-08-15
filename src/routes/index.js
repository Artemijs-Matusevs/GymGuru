//HANDLE ROOT ROUTE
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('dashboard.ejs');
});

export default router;