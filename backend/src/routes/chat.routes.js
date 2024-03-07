import { Router } from "express";
import { createChat, deleteChat, getChat, getChats, updateChat} from "../controllers/chat.controllers.js";
import { validarCreateChat, validarActualizarChat} from "../validations/chat.validacion.js";
import { validartoken } from "../controllers/autenticacionController.js";

const routerChat = Router();

routerChat.get("/chats", validartoken, getChats);
routerChat.get("/chats/:id", validartoken, getChat);
routerChat.post("/chats", validartoken, validarCreateChat, createChat);
routerChat.put("/chats/:id", validartoken, validarActualizarChat, updateChat);
routerChat.delete("/chats/:id", validartoken, deleteChat);

export default routerChat;
