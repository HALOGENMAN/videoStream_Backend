const logger = require('../utils/logger');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.error(`Login failed: User with email ${email} not found`);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      logger.error(`Login failed: Invalid password for user with email ${email}`);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    logger.info(`User with email ${email} logged in successfully`);
    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: user.getToken(), // Assuming getToken is a method on the User model that generates a JWT
      },
    });
    
  }catch (error) {
    next(error);
  }
  
}