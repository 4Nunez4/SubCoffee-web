import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";
import { validateCreateNotificacion, validateActualizarNotificacion } from "../validations/notificacion.validacion.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerNotificaciones = Router()

routerNotificaciones.get('/notificaciones', verificarUserToken, getNotifications)
routerNotificaciones.get('/notificaciones/:id', verificarUserToken, getNotification)
routerNotificaciones.post('/notificaciones', verificarUserToken, validateCreateNotificacion, createNotification)
routerNotificaciones.put('/notificaciones/:id', verificarUserToken, validateActualizarNotificacion, updateNotification)
routerNotificaciones.delete('/notificaciones/:id', verificarUserToken, deleteNotification)

export default routerNotificaciones;