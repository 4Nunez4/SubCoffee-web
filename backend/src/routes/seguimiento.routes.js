import { Router } from "express";
import { listarSeguimientos, postSeguimiento, putSeguimiento, getSeguimientoId, deleteSeguimiento } from "../controllers/seguimiento.controller.js";

const router = Router()

router.get("/seguimientos", listarSeguimientos)
router.post("/seguimientos", postSeguimiento)
router.put("/seguimientos/:id", putSeguimiento)
router.get("/seguimientos/:id", getSeguimientoId)
router.delete("/seguimientos/:id", deleteSeguimiento)

export default router