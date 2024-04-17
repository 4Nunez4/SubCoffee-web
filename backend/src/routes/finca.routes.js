import { Router } from "express";
import { activarFinca, cargarImagen, createFinca, deleteFinca, desactivarFinca, getFinca, getFincas, updateFinca } from "../controllers/finca.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationCreateFinca, validationUpdateFinca } from "../validations/finca.validation.js";

const routerFinca = Router();

routerFinca.get("/finca", verificarUserToken, getFincas);
routerFinca.get("/finca/:id", verificarUserToken, getFinca);
routerFinca.post("/finca", verificarUserToken, cargarImagen, validationCreateFinca, createFinca);
routerFinca.put("/finca/:id", verificarUserToken, cargarImagen, validationUpdateFinca, updateFinca);
routerFinca.delete("/finca/:id", verificarUserToken, deleteFinca);
routerFinca.put("/fincaac/:id", verificarUserToken, activarFinca);
routerFinca.put("/fincades/:id", verificarUserToken, desactivarFinca);

export default routerFinca;
