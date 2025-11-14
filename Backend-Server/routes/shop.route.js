import express from 'express';
import { isAuthenticated } from '../middleware/isAuthencate.js';
import { createNeditShop, GetShop } from '../controllers/Shop.controller.js';  
import { upload } from '../middleware/multer.js';
const shoproute = express.Router(); 
shoproute.post('/createShop',isAuthenticated, upload.single("image") ,createNeditShop); 
shoproute.get('/getshop',isAuthenticated ,GetShop); 
export default shoproute;