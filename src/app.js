import express from 'express';
import {connectToDatabase } from './utils/database.js';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import createError from 'http-errors';
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
app.get('/', async (req, res, next) => {
    try {
      res.send('chopmoney-API-version: 1');
    } catch (error) {
      next(error);
    }
  });
  
  app.use(async (req, res, next) => {
    next(createError.NotFound('this route does not exist'));
  });
  

export default app;
