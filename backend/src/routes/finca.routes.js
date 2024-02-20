import { Router } from "express";
import { registrar, listar,actualizar,buscar,borrar } from "../controllers/finca.controller.js";
const FincaRouter = Router();

FincaRouter.post("/registrar", registrar)
FincaRouter.get("/listar", listar)
FincaRouter.put("/actualizar/:id", actualizar)
FincaRouter.get("/buscar/:id", buscar)
FincaRouter.delete("/eliminar/:id", borrar)

export default FincaRouter;