import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import ConnectMongoDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';

// Load environment variables
const app = express();
const PORT = process.env.port || 5000; 


// Middleware
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRouter); 
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
// }));
// Routes
app.get('/', (req, res) => {
    console.log("Server is running..."); 
    res.send('Welcome to the Food Delivery Backend Server!');
     
}); 

// Start server
app.listen(PORT, () => {
    ConnectMongoDB();
    console.log(`Server is running on port ${PORT}`); 
});