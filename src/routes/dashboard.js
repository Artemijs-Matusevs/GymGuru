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

//Get specific saved template details
router.get('/get-template', authController.isAuthenticated, dashboardController.getWorkoutTemplate);

//Post new workout template details
router.post('/new-template', authController.isAuthenticated, dashboardController.newWorkoutTemplate);

//Put replace existing workout template
router.put('/edit-template', authController.isAuthenticated, dashboardController.editWorkoutTemplate);

//Delete workout
router.delete('/delete-template', authController.isAuthenticated, dashboardController.deleteWorkoutTemplate);

//Start workout and get workout
router.post('/start-workout', authController.isAuthenticated, dashboardController.startWorkout);
router.get('/get-workout', authController.isAuthenticated, dashboardController.getCurrentWorkout);

//Cancel workout
router.delete('/cancel-workout', authController.isAuthenticated, dashboardController.cancelCurrentWorkout);

//Update workout
router.post('/update-workout', authController.isAuthenticated, dashboardController.updateCurrentWorkout);

export default router;