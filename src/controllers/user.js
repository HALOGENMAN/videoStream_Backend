const User = require('../models/user');
const { logger } = require('../utils/logger');

exports.getAllUsers = async (req, res,next) => {
  try{
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude password from the response
    });
    res.status(200).json({
      status: 'success',
      data: allUsers,
    });
  }
  catch (error) {
    next(error);
  }
}

exports.createUser = async (req, res,next) => {
  try {
    const newUser = await User.create(req.body);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
}

exports.getUserById = async (req, res,next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] } // Exclude password from the response
    });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    await user.update(req.body);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    logger.info(`User with ID ${req.params.id} deleted successfully`);
    return res.status(204).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}


exports.routeCheckForUserUpdateAndDelete = async (req, res, next) => {
  try {
    const payload = req.payload;
    if(payload.role !== 'admin') {
      next();
      return;
    }
    if (!payload) {
      throw new Error('Unauthorized access: No valid token provided');
    }
    const user =  await User.findByPk(payload.id)
    if (!user) {
      throw new Error(`Unauthorized access: User with ID ${payload.id} not found`);
    }
    if(user.email !== payload.email) {
      throw new Error(`Unauthorized access: User with ID ${payload.id} does not match token email ${payload.email}`);
    }
    next();
  } catch (error) {
    next(error);
  }
}