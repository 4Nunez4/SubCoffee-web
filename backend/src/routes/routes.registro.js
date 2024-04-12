import { Router } from "express";
import { activar, actualizar, buscar, cargarImagen, desactivar, eliminar, listar, registrar } from "../controllers/controller.registro.js";
import { validarUsuarioActualizar, validarUsuarioRegister } from "../validations/registro.validacion.js";

import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar", verificarUserToken, listar)

router.post("/registrar", cargarImagen, validarUsuarioRegister, registrar)

router.put("/actualizar/:id", cargarImagen , verificarUserToken, validarUsuarioActualizar, actualizar)

router.get("/buscar/:id", verificarUserToken,buscar)

router.delete("/eliminar/:id", verificarUserToken,eliminar)

router.put("/desactivar/:id", verificarUserToken,desactivar)

router.put("/activar/:id", verificarUserToken,activar)

export default router
