const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION || '1h'
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

