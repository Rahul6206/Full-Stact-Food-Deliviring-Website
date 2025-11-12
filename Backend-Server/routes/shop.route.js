import express from 'express';
import { isAuthenticated } from '../middleware/isAuthencate.js';
import { createNeditShop } from '../controllers/Shop.controller.js';



const shoproute = express.Router();


shoproute.post('/createShop',isAuthenticated,createNeditShop);


export default shoproute;