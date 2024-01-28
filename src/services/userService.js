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
}

export { UserService };
