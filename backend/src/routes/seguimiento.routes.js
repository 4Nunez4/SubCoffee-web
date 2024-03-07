import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar } from "../controllers/seguimiento.controller.js";
import { validarActualizarSeguimiento, validarRegistrarSeguimiento } from "../validations/seguimiento.validation.js";
import { validartoken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar",validartoken, listar)
router.post("/registrar",validartoken, validarRegistrarSeguimiento, registrar)
router.put("/actualizar/:id",validartoken, validarActualizarSeguimiento, actualizar)
router.get("/buscar/:id",validartoken, buscar)
router.delete("/eliminar/:id",validartoken, eliminar)

export default router