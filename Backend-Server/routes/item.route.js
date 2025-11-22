import express from 'express';
import { isAuthenticated } from '../middleware/isAuthencate.js';  
import { CreateItem, DeleteItem, EditItems, GetAllitems, Getitems } from '../controllers/Items.controller.js';
import { upload } from '../middleware/multer.js';

const Itemroute = express.Router(); 

Itemroute.post('/createItem', isAuthenticated, upload.single("image"), CreateItem);

Itemroute.put('/editItem/:itemId', isAuthenticated, upload.single("image"), EditItems);


Itemroute.get('/getItem', isAuthenticated, Getitems);
Itemroute.get('/getAllItem', isAuthenticated, GetAllitems);
Itemroute.delete('/delete/:itemId', isAuthenticated, DeleteItem);

export default Itemroute;
