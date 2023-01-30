const {Router} = require('express');
const chatRouter = Router();
const ChatController = require('../controllers/chat.controller');
const {checkToken} = require('../middleware/checkToken')

chatRouter.post('/',checkToken, ChatController.createChat);
chatRouter.post('/:chatId',checkToken, ChatController.addNewMessage );
chatRouter.get('/:chatId',checkToken, ChatController.getChatWithMessages);
chatRouter.get('/user/all', checkToken, ChatController.getAllUsersChats);
chatRouter.put('/:chatId', checkToken, ChatController.addUserToChat)

module.exports = chatRouter;