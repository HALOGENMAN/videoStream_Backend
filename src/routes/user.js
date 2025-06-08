  const { getAllUsers ,createUser,getUserById, updateUser, deleteUser,routeCheckForUserUpdateAndDelete} = require('../controllers/user');
  const { check, param ,validationResult } = require('express-validator');

  module.exports = (route) => {
    return route.get('/',getAllUsers)
          .post('/',[
            check('username').notEmpty().withMessage('Username is required'),
            check('email').isEmail().withMessage('Valid email is required'),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
          ],createUser)
          .get('/:id',[
            param('id').isInt().withMessage('User ID must be an integer'),
          ],getUserById)
          .put('/:id',[
            param('id').isInt().withMessage('User ID must be an integer'),
          ],routeCheckForUserUpdateAndDelete,updateUser)
          .delete('/:id',[
            param('id').isInt().withMessage('User ID must be an integer'),
          ],routeCheckForUserUpdateAndDelete,deleteUser);
  }