import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar, desactivar, activar } from "../controllers/seguimiento.controller.js";
import { validarActualizarSeguimiento, validarRegistrarSeguimiento } from "../validations/seguimiento.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar",verificarUserToken, listar)
router.post("/registrar",verificarUserToken, validarRegistrarSeguimiento, registrar)
router.put("/actualizar/:id",verificarUserToken, validarActualizarSeguimiento, actualizar)
router.get("/buscar/:id",verificarUserToken, buscar)
router.delete("/eliminar/:id",verificarUserToken, eliminar)
router.put("/desactivar/:id",verificarUserToken, desactivar)
router.put("/activar/:id",verificarUserToken, activar)

export default router