import { Router } from "express";
import { createChat, deleteChat, getChat, getChats, updateChat } from "../controllers/chat.controllers.js";

const router = Router();

router.get('/chat', getChats)
router.get('/chat/:id', getChat)
router.post('/chat', createChat)
router.put('/chat/:id', updateChat)
router.delete('/chat/:id', deleteChat)

export default router;
