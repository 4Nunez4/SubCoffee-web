import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChat,
  getChats,
  updateChat,
} from "../controllers/chat.controllers.js";
import { validarCreateChat, validarActualizarChat } from "../validations/chat.validacion.js";

const routerChat = Router();

routerChat.get("/chats", getChats);
routerChat.get("/chats/:id", getChat);
routerChat.post("/chats", validarCreateChat, createChat);
routerChat.put("/chats/:id", validarActualizarChat, updateChat);
routerChat.delete("/chats/:id", deleteChat);

export default routerChat;
