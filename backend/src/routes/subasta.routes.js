import { Router } from "express";
import { listar, registrar, actualizar, buscar, eliminar } from "../controllers/subasta.controllers.js";
import { validarActualizarSubasta, validarRegistrarSubasta} from "../validations/subasta.validation.js";
import { validartoken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar",validartoken, listar)
router.post("/registrar",validartoken, validarRegistrarSubasta, registrar)
router.put("/actualizar/:id",validartoken, validarActualizarSubasta, actualizar)
router.get("/buscar/:id",validartoken, buscar)
router.delete("/eliminar/:id",validartoken, eliminar)

export default router