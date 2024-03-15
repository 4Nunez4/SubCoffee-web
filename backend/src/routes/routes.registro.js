import { Router } from "express";
import { activar, actualizar, buscar, desactivar, eliminar, listar, registrar } from "../controllers/controller.registro.js";
import { validarUsuarioActualizacion, validarUsuarioRegister } from "../validations/registro.validacion.js";

import { validartoken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar", validartoken,  listar)
router.post("/registrar",validarUsuarioRegister, registrar)
router.put("/actualizar/:id", validartoken,validarUsuarioActualizacion,  actualizar)
router.get("/buscar/:id", validartoken,buscar)
router.delete("/eliminar/:id", validartoken,eliminar)
router.put("/desactivar/:id", validartoken,desactivar)
router.put("/activar/:id", validartoken,activar)

export default router