import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";
import { validateCreateNotificacion, validateActualizarNotificacion } from "../validations/notificacion.validacion.js";

const routerDocument = Router()

routerDocument.get('/notificaciones', getNotifications)
routerDocument.get('/notificaciones/:id', getNotification)
routerDocument.post('/notificaciones',validateCreateNotificacion, createNotification)
routerDocument.put('/notificaciones/:id',validateActualizarNotificacion, updateNotification)
routerDocument.delete('/notificaciones/:id', deleteNotification)

export default routerDocument;