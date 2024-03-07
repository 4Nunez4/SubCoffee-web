import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar, desactivar, activar } from "../controllers/seguimiento.controller.js";
import { validarActualizarSeguimiento, validarRegistrarSeguimiento } from "../validations/seguimiento.validation.js";
import { validartoken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar",validartoken, listar)
router.post("/registrar",validartoken, validarRegistrarSeguimiento, registrar)
router.put("/actualizar/:id",validartoken, validarActualizarSeguimiento, actualizar)
router.get("/buscar/:id",validartoken, buscar)
router.delete("/eliminar/:id",validartoken, eliminar)
router.put("/desactivar/:id",validartoken, desactivar)
router.put("/activar/:id",validartoken, activar)

export default router