// finca.routes.js
import { Router } from "express";
import {Imagen, registrar, listar,actualizar,buscar,borrar,desactivar,activar } from "../controllers/finca.controller.js";
import { validateActualizarFinca, validateRegistarFinca } from "../validations/finca.validacion.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const FincaRouter = Router();

FincaRouter.post("/registrar",Imagen,verificarUserToken,validateRegistarFinca, registrar)
FincaRouter.get("/listar",verificarUserToken, listar)
FincaRouter.put("/actualizar/:id",Imagen,verificarUserToken,validateActualizarFinca, actualizar)
FincaRouter.get("/buscar/:id",verificarUserToken, buscar)
FincaRouter.delete("/eliminar/:id",verificarUserToken, borrar)
FincaRouter.put("/desactivar/:id",verificarUserToken, desactivar)
FincaRouter.put("/activar/:id",verificarUserToken, activar)

export default FincaRouter;