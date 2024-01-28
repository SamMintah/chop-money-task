import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables');
    return false;
  }

  try {
    const options = { autoIndex: true, family: 4, maxPoolSize: 10 };
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('Database connected');
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB. Reason:', error.message);
    return false;
  }
};

export { connectToDatabase };
