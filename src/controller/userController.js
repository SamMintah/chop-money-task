import { UserService } from '../services/userService.js';

class UserController {
  static async addUser(req, res) {
    try {
      const newUser = await UserService.register(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      const errorMessage = { error: error.message };
      res.status(400).json(errorMessage);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching users' });
    }
  }

  static async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await UserService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching user' });
    }
  }
}

export { UserController };
