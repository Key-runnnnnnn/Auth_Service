const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        throw error;
      }
      console.log("Something went wrong on service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      // step 1-> fetch the user using the email
      const user = await this.userRepository.getByEmail(email);
      // step 2-> compare incoming plain password with stores encrypted password
      const passwordsMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordsMatch) {
        console.log("Password doesn't match");
        throw { error: 'Incorrect password' };
      }
      // step 3-> if passwords match then create a token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      if (error.name == 'AttributeNotFound') {
        throw error;
      }
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: 'Invalid token' }
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: 'No user with the corresponding token exists' };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
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

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

}

module.exports = UserService;