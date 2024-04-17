import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar } from "../controllers/subasta.controllers.js";
import { validarActualizarSubasta, validarRegistrarSubasta} from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar",verificarUserToken, listar)
router.post("/registrar",verificarUserToken, validarRegistrarSubasta, registrar)
router.put("/actualizar/:id",verificarUserToken, validarActualizarSubasta, actualizar)
router.get("/buscar/:id",verificarUserToken, buscar)
router.delete("/eliminar/:id",verificarUserToken, eliminar)

export default router