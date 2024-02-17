import { Router } from "express";
import { getSubastaId, listarSubastas, postSubasta, putSubasta, deleteSubasta } from "../controllers/subasta.controllers.js";

const router = Router()

router.get("/subastas/listar", listarSubastas)
router.post("/subastas/agregar", postSubasta)
router.put("/subastas/:id", putSubasta)
router.get("/subastas/:id", getSubastaId)
router.delete("/subastas/:id", deleteSubasta)

export default router