//HANDLE REGISTER ROUTES
import express from 'express';
import registerController from '../controllers/registerController.js';

const router = express.Router();

router.post('/register', registerController.newLocalUser);

export default router;