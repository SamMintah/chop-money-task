import express from 'express';
import {connectToDatabase } from './utils/database.js';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

export default app;
