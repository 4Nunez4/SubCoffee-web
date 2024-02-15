import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";

const routerDocument = Router()

routerDocument.get('/notifications', getNotifications)
routerDocument.get('/notifications/:id', getNotification)
routerDocument.post('/notifications', createNotification)
routerDocument.put('/notifications/:id', updateNotification)
routerDocument.delete('/notifications/:id', deleteNotification)

export default routerDocument;