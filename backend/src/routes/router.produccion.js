import { Router } from "express";
import { registrarProduccion, listarProduccion, actualizarProduccion, buscarProduccion, desactivarProduccion, activarProduccion } from "../controllers/controller.produccion.js";
import { valiActualizacionProduccion, valiRegistroProduccion } from "../validations/validation.produccion.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
const rutaProduccion = Router();

rutaProduccion.post("/registrar", verificarUserToken, valiRegistroProduccion, registrarProduccion);
rutaProduccion.get("/listar", verificarUserToken,listarProduccion);
rutaProduccion.put("/actualizar/:id",verificarUserToken,valiActualizacionProduccion,actualizarProduccion);
rutaProduccion.get("/buscar/:id", verificarUserToken,buscarProduccion);
rutaProduccion.put("/desactivar/:id",verificarUserToken, desactivarProduccion);
rutaProduccion.put("/activar/:id", verificarUserToken,activarProduccion);

export default rutaProduccion;