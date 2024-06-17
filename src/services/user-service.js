const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong on service layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await this.userRepository.destroy(userId);
    } catch (error) {
      console.log("Something went wrong on service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign({ user }, JWT_KEY, { expiresIn: '1h' });
      return token;
    } catch (error) {
      console.log("Something went wrong on generating web token");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_KEY);
      return decoded;
    } catch (error) {
      console.log("Something went wrong on verifying web token", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }

}

module.exports = UserService;