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
}

export { UserController };
