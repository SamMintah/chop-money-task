import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

class UserService {
  static async register(data) {
    try {
      const {
        username,
        firstName,
        otherName,
        msisdn,
        password,
        countryCode,
        isoCode,
        email,
        gender
      } = data;

      const existingUser = await User.findOne({
        $or: [{ username }, { email }]
      });
      if (existingUser) return 'Username or email already exists';

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        firstName,
        otherName,
        msisdn,
        password: hashedPassword,
        countryCode,
        isoCode,
        email,
        gender
      });

      await newUser.save();

      const response = { ...newUser._doc, password: undefined };
      return {
        message: 'User registered successfully',
        user: response
      };
    } catch (error) {
      console.error(`Error registering user: ${error}`);
      throw error;
    }
  }
  static async getAllUsers() {
    try {
      const users = await User.find({}, { password: 0 });
      return users;
    } catch (error) {
      console.error(`Error fetching all users: ${error}`);
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await User.findById(userId, { password: 0 }); 

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error(`Error fetching user by ID: ${error}`);
      throw error;
    }
  }
}

export { UserService };
