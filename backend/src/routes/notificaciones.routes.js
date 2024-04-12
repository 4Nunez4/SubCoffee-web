import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";
import { validateCreateNotificacion, validateActualizarNotificacion } from "../validations/notificacion.validacion.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerDocument = Router()

routerDocument.get('/notificaciones', verificarUserToken, getNotifications)
routerDocument.get('/notificaciones/:id', verificarUserToken, getNotification)
routerDocument.post('/notificaciones', verificarUserToken, validateCreateNotificacion, createNotification)
routerDocument.put('/notificaciones/:id', verificarUserToken, validateActualizarNotificacion, updateNotification)
routerDocument.delete('/notificaciones/:id', verificarUserToken, deleteNotification)

export default routerDocument;