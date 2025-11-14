import express from 'express';
import { isAuthenticated } from '../middleware/isAuthencate.js';  
import { CreateItem, EditItems, Getitems } from '../controllers/Items.controller.js';
import { upload } from '../middleware/multer.js';
const Itemroute = express.Router(); 
Itemroute.post('/createItem',isAuthenticated,upload.single("image") ,CreateItem); 
Itemroute.post('/editItem',isAuthenticated,upload.single("image") ,EditItems); 
Itemroute.get('/getItem',isAuthenticated,Getitems); 
export default Itemroute;