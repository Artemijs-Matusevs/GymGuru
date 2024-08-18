//HANDLE DASHBOARD RELATED ROUTES
import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/dashboard', authController.isAuthenticated, dashboardController.dashboard);

export default router;