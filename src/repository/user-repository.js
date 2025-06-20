const { User, Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error');
const { StatusCodes } = require('http-status-codes');

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        throw new ValidationError(error);
      }
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId
        }
      });
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'email']
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail
        }
      });
      if (!user) {
        throw new ClientError(
            'AttributeNotFound',
            'Invalid email sent in the request',
            'Please Check the Email, as there is no record of the email',
            StatusCodes.NOT_FOUND
        )
    }
      return user;
    } catch (error) {
      console.log(error)
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email']
      });
      return users;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
  

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: 'ADMIN'
        }
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

}

module.exports = UserRepository;