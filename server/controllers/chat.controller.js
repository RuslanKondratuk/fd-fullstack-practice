const {Chat} = require('../models/index');
const {Message} = require('../models/index');
const {User} = require('../models/index')

module.exports.createChat = async (req, res, next) => {
    try {
        const {body} = req;
        const newChat = await Chat.create(body);
        res.status(201).send({data: newChat})
    } catch (error) {
        next(error)
    }
}

module.exports.addUserToChat = async (req, res, next) => {
 try {
    const {body: {userId}, params: {chatId}} = req;
    const chatInstance = await Chat.findById(chatId);
    chatInstance.members.push(userId);
    chatInstance.save();
    res.status(200).send(chatInstance)
 } catch (error) {
    next(error)
 }
}

module.exports.addNewMessage = async (req, res, next) => {
     try {
        const {body, params: {chatId}, payload: {userId}} = req;
        const chatInstance = await Chat.findById(chatId);
        const newMessage = await Message.create({...body, chatId, author: userId});
        chatInstance.messages.push(newMessage)
        chatInstance.save();
        res.status(201).send({data: newMessage})
     } catch (error) {
        next(error)
     }
}

module.exports.getAllUsersChats = async (req, res, next) => {
    try {
        const {payload: {userId}} = req;
        const chats = await Chat.find({
            members: userId
        })
        res.status(200).send({data: chats})
    } catch (error) {
        next(error)
    }
}

module.exports.getChatWithMessages = async (req, res, next) => {
    try {
        const {params: {chatId}} = req;
        const chatWithMessages = await Chat.findById(chatId).populate('messages');
        res.status(200).send(chatWithMessages)
    } catch (error) {
        next (error)
    }
}