import express from 'express';
import { isAuthenticated } from '../middleware/isAuthencate.js';
import { getCurrentUser } from '../controllers/user.controller.js';


const userRoutes = express.Router();


userRoutes.get('/currentuser',isAuthenticated,getCurrentUser);


export default userRoutes;