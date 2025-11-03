import express from 'express';
import { isAuthenticate } from '../middleware/isAuthencate.js';
import { getCurrentUser } from '../controllers/user.controller.js';


const userRoutes = express.Router();


userRoutes.get('/currentuser',isAuthenticate,getCurrentUser);


export default userRoutes;