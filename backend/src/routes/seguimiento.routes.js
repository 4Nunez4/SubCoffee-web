import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar } from "../controllers/seguimiento.controller.js";

const router = Router()

router.get("/listar", listar)
router.post("/registrar", registrar)
router.put("/actualizar/:id", actualizar)
router.get("/buscar/:id", buscar)
router.delete("/eliminar/:id", eliminar)

export default router