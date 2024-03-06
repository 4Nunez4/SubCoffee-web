import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";
import { validateCreateNotificacion, validateActualizarNotificacion } from "../validations/notificacion.validacion.js";
import { validartoken } from "../controllers/autenticacionController.js";

const routerDocument = Router()

routerDocument.get('/notificaciones', validartoken, getNotifications)
routerDocument.get('/notificaciones/:id', validartoken, getNotification)
routerDocument.post('/notificaciones', validartoken, validateCreateNotificacion, createNotification)
routerDocument.put('/notificaciones/:id', validartoken, validateActualizarNotificacion, updateNotification)
routerDocument.delete('/notificaciones/:id', validartoken, deleteNotification)

export default routerDocument;