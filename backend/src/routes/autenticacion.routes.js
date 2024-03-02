import { validarUsuario } from "../controllers/autenticacionController.js";
import { Router } from "express";

const autenticacionRouter = Router()

autenticacionRouter.post('/validar',validarUsuario);

export default autenticacionRouter;