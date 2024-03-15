import { Router } from "express";
import { registrar, listar,actualizar,buscar,borrar,desactivar,activar } from "../controllers/finca.controller.js";
import { validateActualizarFinca, validateRegistarFinca } from "../validations/finca.validacion.js";
import { validartoken } from "../controllers/autenticacionController.js";
const FincaRouter = Router();

FincaRouter.post("/registrar",validartoken,validateRegistarFinca, registrar)
FincaRouter.get("/listar",validartoken, listar)
FincaRouter.put("/actualizar/:id",validartoken,validateActualizarFinca, actualizar)
FincaRouter.get("/buscar/:id",validartoken, buscar)
FincaRouter.delete("/eliminar/:id",validartoken, borrar)
FincaRouter.put("/desactivar/:id",validartoken, desactivar)
FincaRouter.put("/activar/:id",validartoken, activar)

export default FincaRouter;