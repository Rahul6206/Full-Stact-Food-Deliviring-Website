import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ConnectMongoDB from './config/db.js';
const app = express();
const PORT = process.env.port || 5000; 

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Food Delivery Backend Server!');
});

// Start server
app.listen(PORT, () => {
    ConnectMongoDB();
    console.log(`Server is running on port ${PORT}`);
});