import { Router } from "express";
import {Imagen, createChat, deleteChat, getChat, getChats, updateChat} from "../controllers/chat.controllers.js";
import { validarCreateChat, validarActualizarChat} from "../validations/chat.validacion.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerChat = Router();

routerChat.post("/chats", Imagen,verificarUserToken, validarCreateChat, createChat);
routerChat.get("/chats", verificarUserToken, getChats);
routerChat.put("/chats/:id",Imagen, verificarUserToken, validarActualizarChat, updateChat);
routerChat.get("/chats/:id", verificarUserToken, getChat);
routerChat.delete("/chats/:id", verificarUserToken, deleteChat);

export default routerChat;
