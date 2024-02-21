import { Router } from "express";
import { registrarProduccion, actualizarProduccion, buscarProduccion, borrarProduccion, listarProduccion } from "../controllers/controller.oferta.js";
const rutaProduccion = Router();

rutaProduccion.post('/registrar',registrarProduccion);
rutaProduccion.get('/listar',listarProduccion);
rutaProduccion.put('/actualizar/:id',actualizarProduccion);
rutaProduccion.get('/buscar/:id',buscarProduccion);
rutaProduccion.delete('/borrar/:id',borrarProduccion);

export default rutaProduccion;