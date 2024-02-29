import { Router } from "express";
import { registrar, listar,actualizar,buscar,borrar } from "../controllers/finca.controller.js";
import { validateActualizarFinca, validateRegistarFinca } from "../validations/finca.validacion.js";
const FincaRouter = Router();

FincaRouter.post("/registrar",validateRegistarFinca, registrar)
FincaRouter.get("/listar", listar)
FincaRouter.put("/actualizar/:id",validateActualizarFinca, actualizar)
FincaRouter.get("/buscar/:id", buscar)
FincaRouter.delete("/eliminar/:id", borrar)

export default FincaRouter;