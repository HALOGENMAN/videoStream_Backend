const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_TIME
  });
}; 

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME
  });
}; 

exports.verifyToken = (req,res,next) => {
  try {
    let token = req.headers['authorization']; 
    
    if (!token || !token.startsWith('Bearer ')) {
      return next(new Error('Token is missing or malformed'))
    }
    token = token.split(' ')[1];
    let payload =  jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
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

