import { Router } from "express";
import { actualizar, buscar, desactivar, eliminar, listar, registrar } from "../controllers/controller.registro.js";
import { validarUsuarioActualizacion, validarUsuarioRegister } from "../validations/registro.validacion.js";

const router = Router()

router.get("/listar", listar)
router.post("/registrar", validarUsuarioRegister, registrar)
router.put("/actualizar/:id", validarUsuarioActualizacion, actualizar)
router.get("/buscar/:id", buscar)
router.delete("/eliminar/:id", eliminar)
router.put("/desactivar/:id", desactivar)

export default router