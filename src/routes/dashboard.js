//HANDLE DASHBOARD RELATED ROUTES
import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

//Main template
router.get('/dashboard', authController.isAuthenticated, dashboardController.dashboard);

//Partials
router.get('/dashboard-main', dashboardController.dashboardMain);
router.get('/workout', dashboardController.workout);
router.get('/history', dashboardController.history);
router.get('/calories', dashboardController.calories);
router.get('/measurements', dashboardController.measurements);

export default router;