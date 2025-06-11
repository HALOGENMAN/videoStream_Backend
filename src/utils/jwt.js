const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION || '1h'
  });
}; 

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME
  });
}; 

exports.verifyToken = (token) => {
  try {
    if (!token || !token.startsWith('Bearer ')) {
      return new Error('Token is missing or malformed');
    }
    token = token.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

exports.verifyRefreshToken = (token) => {
  try {
    if (!token) {
      return new Error('Refresh Token is missing or malformed');
    }
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid Refresh token');
  }
}

