import { Router } from "express";
import { activar, actualizar, buscar, desactivar, eliminar, listar, registrar } from "../controllers/controller.registro.js";
import { validarUsuarioActualizacion, validarUsuarioRegister } from "../validations/registro.validacion.js";

import { validartoken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar", validartoken,  listar)
router.post("/registrar", validarUsuarioRegister, registrar)
router.put("/actualizar/:id", validarUsuarioActualizacion,  actualizar)
router.get("/buscar/:id", buscar)
router.delete("/eliminar/:id", eliminar)
router.put("/desactivar/:id", desactivar)
router.put("/activar/:id", activar)

export default router