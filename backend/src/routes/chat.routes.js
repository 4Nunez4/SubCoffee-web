import { Router } from "express";
import { createChat, deleteChat, getChat, getChats, updateChat} from "../controllers/chat.controllers.js";
import { validarCreateChat, validarActualizarChat} from "../validations/chat.validacion.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerChat = Router();

routerChat.get("/chats", verificarUserToken, getChats);
routerChat.get("/chats/:id", verificarUserToken, getChat);
routerChat.post("/chats", verificarUserToken, validarCreateChat, createChat);
routerChat.put("/chats/:id", verificarUserToken, validarActualizarChat, updateChat);
routerChat.delete("/chats/:id", verificarUserToken, deleteChat);

export default routerChat;
