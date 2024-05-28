import { Router } from "express";
import { activarFinca, cargarImagen, createFinca, deleteFinca, desactivarFinca, getFinca, getFincas, getFincasActivas, updateFinca } from "../controllers/finca.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationCreateFinca } from "../validations/finca.validation.js";

const routerFinca = Router();

routerFinca.get("/finca", verificarUserToken, getFincas);
routerFinca.get("/finca/:id", verificarUserToken, getFinca);
routerFinca.get("/fincasactivas/:id", verificarUserToken, getFincasActivas);
routerFinca.post("/finca", verificarUserToken, cargarImagen, validationCreateFinca, createFinca);
routerFinca.put("/finca/:id", verificarUserToken, cargarImagen, validationCreateFinca,  updateFinca);
routerFinca.delete("/finca/:id", verificarUserToken, deleteFinca);
routerFinca.put("/fincaac/:id", verificarUserToken, activarFinca);
routerFinca.put("/fincades/:id", verificarUserToken, desactivarFinca);

export default routerFinca;
