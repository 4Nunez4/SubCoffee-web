import { Router } from "express";
import { registrarProduccion, listarProduccion, actualizarProduccion, buscarProduccion, desactivarProduccion, activarProduccion } from "../controllers/controller.produccion.js";
import { valiActualizacionProduccion, valiRegistroProduccion } from "../validations/validation.produccion.js";
import { validartoken } from "../controllers/autenticacionController.js";
const rutaProduccion = Router();

rutaProduccion.post("/registrar", validartoken, valiRegistroProduccion, registrarProduccion);
rutaProduccion.get("/listar", validartoken,listarProduccion);
rutaProduccion.put("/actualizar/:id",validartoken,valiActualizacionProduccion,actualizarProduccion);
rutaProduccion.get("/buscar/:id", validartoken,buscarProduccion);
rutaProduccion.put("/desactivar/:id",validartoken, desactivarProduccion);
rutaProduccion.put("/activar/:id", validartoken,activarProduccion);

export default rutaProduccion;