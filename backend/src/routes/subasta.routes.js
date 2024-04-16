import { Router } from "express";
import { listar, registrarSubasta, actualizarSubasta, buscar, eliminar, desactivarSubasta, cargarImagen } from "../controllers/subasta.controllers.js";
import { validarActualizarSubasta, validarRegistrarSubasta} from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar",verificarUserToken, listar)
router.post("/registrar", verificarUserToken, cargarImagen,validarRegistrarSubasta, registrarSubasta)
router.put("/actualizar/:id",verificarUserToken, validarActualizarSubasta, actualizarSubasta)
router.get("/buscar/:id",verificarUserToken, buscar)
router.delete("/eliminar/:id",verificarUserToken, eliminar)
router.put("/desactivar/:id",verificarUserToken, desactivarSubasta)

export default router