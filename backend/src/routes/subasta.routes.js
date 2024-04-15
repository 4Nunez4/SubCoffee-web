import { Router } from "express";
import { listar, buscar, eliminar, cargarImagen, registrarSubasta, actualizarSubasta, esperaSubasta, CerrarSubasta} from "../controllers/subasta.controllers.js";
import { validarActualizarSubasta, validarRegistrarSubasta} from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router()

router.get("/listar",verificarUserToken, listar)
router.post("/registrar", verificarUserToken, cargarImagen,validarRegistrarSubasta, registrarSubasta)
router.put("/actualizar/:id",verificarUserToken, cargarImagen, validarActualizarSubasta, actualizarSubasta)
router.get("/buscar/:id",verificarUserToken, buscar)
router.put("/espera/:id", esperaSubasta)
router.put("/cerrar/:id", CerrarSubasta)
router.delete("/eliminar/:id",verificarUserToken, eliminar)

export default router