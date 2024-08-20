//HANDLE DASHBOARD RELATED ROUTES
import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

//Main template
router.get('/dashboard', authController.isAuthenticated, dashboardController.dashboard);

//Partials
router.get('/dashboard-main', authController.isAuthenticated, dashboardController.dashboardMain);
router.get('/workout', authController.isAuthenticated, dashboardController.workout);
router.get('/history', authController.isAuthenticated, dashboardController.history);
router.get('/calories', authController.isAuthenticated, dashboardController.calories);
router.get('/measurements', authController.isAuthenticated, dashboardController.measurements);

export default router;