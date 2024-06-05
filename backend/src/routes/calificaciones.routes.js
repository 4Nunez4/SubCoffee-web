import { Router } from "express"
import { createCalificacion, getCalificacionUser, getCalificaciones, updateCalificacion } from "../controllers/calificaciones.controller.js"
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routesCalificaciones = Router()

routesCalificaciones.get('/calificaciones/:id', verificarUserToken, getCalificaciones)
routesCalificaciones.get('/calificacionForId/:id', verificarUserToken, getCalificacionUser)
routesCalificaciones.post('/calificaciones', verificarUserToken, createCalificacion)
routesCalificaciones.put('/calificaciones/:id', verificarUserToken, updateCalificacion)

export default routesCalificaciones
