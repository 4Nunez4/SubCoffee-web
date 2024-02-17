import { Router } from "express";
import { actualizar, buscar, eliminar, listar, registrar } from "../controllers/controller.registro.js";

const router = Router()

router.get("/listar", listar)
router.post("/registrar", registrar)
router.put("/actualizar/:pk_cedula_user", actualizar)
router.get("/buscar/:pk_cedula_user", buscar)
router.delete("/eliminar/:pk_cedula_user", eliminar)

export default router