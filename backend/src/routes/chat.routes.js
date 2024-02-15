import { Router } from "express";
import { createChat, deleteChat, getChat, getChats, updateChat } from "../controllers/chat.controllers.js";

const routerChat = Router();

routerChat.get('/chats', getChats)
routerChat.get('/chats/:id', getChat)
routerChat.post('/chats', createChat)
routerChat.put('/chats/:id', updateChat)
routerChat.delete('/chats/:id', deleteChat)

export default routerChat;
