import { Router } from "express";
import { subastaFiles, listar, registrar, actualizar, buscar, eliminar } from "../controllers/subasta.controllers.js";
import { validarActualizarSubasta, validarRegistrarSubasta} from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router()

router.post("/registrar",subastaFiles,verificarUserToken, validarRegistrarSubasta, registrar)
router.get("/listar",verificarUserToken, listar)
router.put("/actualizar/:id",subastaFiles,verificarUserToken, validarActualizarSubasta, actualizar)
router.get("/buscar/:id",verificarUserToken, buscar)
router.delete("/eliminar/:id",verificarUserToken, eliminar)

export default router