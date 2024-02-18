import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";

const routerDocument = Router()

routerDocument.get('/notificaciones', getNotifications)
routerDocument.get('/notificaciones/:id', getNotification)
routerDocument.post('/notificaciones', createNotification)
routerDocument.put('/notificaciones/:id', updateNotification)
routerDocument.delete('/notificaciones/:id', deleteNotification)

export default routerDocument;