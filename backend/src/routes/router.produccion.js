import { Router } from "express";
import { registrarProduccion, listarProduccion, actualizarProduccion, buscarProduccion, desactivarProduccion } from "../controllers/controller.produccion.js";
import { valiActualizacionProduccion, valiRegistroProduccion } from "../validations/validation.produccion.js";
const rutaProduccion = Router();

rutaProduccion.post('/registrar',valiRegistroProduccion,registrarProduccion);
rutaProduccion.get('/listar',listarProduccion);
rutaProduccion.put('/actualizar/:id',valiActualizacionProduccion,actualizarProduccion);
rutaProduccion.get('/buscar/:id',buscarProduccion);
rutaProduccion.put('/desactivar/:id',desactivarProduccion);

export default rutaProduccion;