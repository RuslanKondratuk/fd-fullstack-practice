const {Router} = require ('express');
const {hashPass} = require('../middleware/hashPassword')
const UserController = require('../controllers/user.controller')
const userRouter = Router();


userRouter.post('/sign-up', hashPass, UserController.signUpUser);
userRouter.post('/sign-in', UserController.signInUser );
userRouter.get('/:userId', UserController.getOneUser);

module.exports = userRouter