import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";
import { validateCreateNotificacion, validateActualizarNotificacion } from "../validations/notificacion.validacion.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const rutNotificaciones = Router()

rutNotificaciones.get('/notificaciones', verificarUserToken, getNotifications)
rutNotificaciones.get('/notificaciones/:id', verificarUserToken, getNotification)
rutNotificaciones.post('/notificaciones', verificarUserToken, validateCreateNotificacion, createNotification)
rutNotificaciones.put('/notificaciones/:id', verificarUserToken, validateActualizarNotificacion, updateNotification)
rutNotificaciones.delete('/notificaciones/:id', verificarUserToken, deleteNotification)
export default rutNotificaciones;