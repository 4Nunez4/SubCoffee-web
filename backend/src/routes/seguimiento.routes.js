import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar } from "../controllers/seguimiento.controller.js";
import { validarActualizarSeguimiento, validarRegistrarSeguimiento } from "../validations/seguimiento.validation.js";

const router = Router()

router.get("/listar", listar)
router.post("/registrar",validarRegistrarSeguimiento, registrar)
router.put("/actualizar/:id",validarActualizarSeguimiento, actualizar)
router.get("/buscar/:id", buscar)
router.delete("/eliminar/:id", eliminar)

export default router