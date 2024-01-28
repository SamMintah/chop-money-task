import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { createToken } from '../utils/createToken.js';

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

      const resetToken = generateResetToken();
      user.resetToken = resetToken;
      await user.save();

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
      // Find the user with the provided email and matching reset token
      const user = await User.findOne({ email, resetToken });
      if (!user) {
        return res
          .status(404)
          .json({ error: 'Invalid reset token or user not found' });
      }

      // Update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      // Clear the reset token (optional, depending on your requirements)
      user.resetToken = undefined;

      await user.save();
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error completing password reset' });
    }
  }
}

export { AuthController };
