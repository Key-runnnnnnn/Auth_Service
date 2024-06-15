const UserService = require('../services/user-service')

const userService = new UserService(); 

const create = async (req, res) => {
  try {
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password
    });
    return res.status(201).json({
      message: "User created",
      data: user,
      success: true,
      err:{}
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong on controller layer",
      data:{},
      success: false,
      err:error
    });
  }
}

module.exports = {
  create
}