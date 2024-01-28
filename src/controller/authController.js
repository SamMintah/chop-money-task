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
}

export { AuthController };
