import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar } from "../controllers/subasta.controllers.js";
import { validarActualizarSubasta, validarRegistrarSubasta} from "../validations/subasta.validation.js";

const router = Router()

router.get("/listar", listar)
router.post("/registrar",validarRegistrarSubasta, registrar)
router.put("/actualizar/:id",validarActualizarSubasta, actualizar)
router.get("/buscar/:id", buscar)
router.delete("/eliminar/:id", eliminar)

export default router