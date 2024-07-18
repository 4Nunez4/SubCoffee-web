import { Router } from "express";
import { activarFinca, cargarImagen, createFinca, deleteFinca, desactivarFinca, getFinca, getFincaOne, getFincas, getFincasActivas, updateFinca } from "../controllers/finca.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationFinca } from "../validations/finca.validation.js";

const routerFinca = Router();

routerFinca.get("/finca", verificarUserToken, getFincas);
routerFinca.get("/fincaone/:id", verificarUserToken, getFincaOne);
routerFinca.get("/fincauser/:id", verificarUserToken, getFinca);
routerFinca.get("/fincasactivas/:id", verificarUserToken, getFincasActivas);
routerFinca.post("/finca", verificarUserToken, cargarImagen, createFinca);
routerFinca.put("/finca/:id", verificarUserToken, cargarImagen, updateFinca);
routerFinca.delete("/finca/:id", verificarUserToken, deleteFinca);
routerFinca.put("/fincaac/:id", verificarUserToken, activarFinca);
routerFinca.put("/fincades/:id", verificarUserToken, desactivarFinca);

export default routerFinca;
