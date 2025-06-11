const logger = require('../utils/logger');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const { verifyRefreshToken } = require('../utils/jwt');

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

    console.log('=====================')

    await RefreshToken.destroy({
      where: { userId: user.id }
    });

    const refreshToken = user.getRefreshToken();

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id
    });

    console.log(`=====================Generated refresh token for user with email ${email}: ${refreshToken}`);

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
        token: user.getToken(),
        refreshToken: refreshToken // Include the refresh token in the response
      },
    });
    
  }catch (error) {
    next(error);
  }
  
}

exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token is required',
      });
    }

    payload = verifyRefreshToken(token);

    let user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 'success',
      newToken: user.getToken() // Replace with actual token generation logic
    });
  } catch (error) {
    next(error);
  }
};