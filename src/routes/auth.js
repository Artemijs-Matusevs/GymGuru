//HANDLE AUTHENTICATION ROUTES
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/dashboard', authController.googleCallback);
router.get('/logout', authController.logout);
router.get('/dashboard', authController.dashboard);

export default router;