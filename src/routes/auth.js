const { check, validationResult } = require('express-validator');
const { login , refreshToken} = require('../controllers/auth');

module.exports = (route) => {
    return route.post('/login',[
            check('email').isEmail().withMessage('Valid email is required'),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
          ],login)
          .post('/refreshToken',refreshToken)
  }