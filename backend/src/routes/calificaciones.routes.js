import { Router } from "express"
import { createCalificacion, getCalificacionUser, getCalificaciones, updateCalificacion } from "../controllers/calificaciones.controller.js"
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerCalificaciones = Router()

routerCalificaciones.get('/calificaciones/:id', verificarUserToken, getCalificaciones)
routerCalificaciones.get('/calificacionForId/:id', verificarUserToken, getCalificacionUser)
routerCalificaciones.post('/calificaciones', verificarUserToken, createCalificacion)
routerCalificaciones.put('/calificaciones/:id', verificarUserToken, updateCalificacion)

export default routerCalificaciones
