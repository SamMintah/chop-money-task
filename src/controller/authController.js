import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { createToken } from '../utils/createToken.js';
import { sendResetTokenEmail } from '../utils/sendResetToken.js';
import { generateResetToken,validateResetToken } from '../utils/resetToken.js';

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
      }

      const token = createToken(user.id);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error during login' });
    }
  }

  static async logout(req, res) {
    res.status(200).json({ message: 'Logout successful' });
  }

  static async resetPasswordInitiate(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Generate a reset token
      const resetToken = generateResetToken();
      // Send the reset token to the user via email (you'll need to implement this)
      sendResetTokenEmail(user.email, resetToken);
      return res.status(200).json({ message: 'Password reset initiated' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error initiating password reset' });
    }
  }

  static async resetPasswordComplete(req, res) {
    
    try {
      const { email, resetToken, newPassword } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'Invalid reset token or user not found' });
      }
  
      // Validate the reset token (you may want to use a library for this)
      const isTokenValid = validateResetToken(resetToken);
  
      if (!isTokenValid) {
        return res.status(400).json({ error: 'Invalid reset token' });
      }
  
      // Update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
  
      await user.save();
  
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error completing password reset' });
    }
  }
}

 export { AuthController };


