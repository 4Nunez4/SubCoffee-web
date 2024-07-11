import { validarUser, verificarUserToken } from "../controllers/autenticacionController.js";
import { Router } from "express";

const autenticacionRouter = Router()

autenticacionRouter.post('/login', validarUser);
autenticacionRouter.get("/validate", verificarUserToken)


export default autenticacionRouter;