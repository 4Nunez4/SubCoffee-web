import { Router } from "express";
import { activarVariedad, cargarImagen, createVariedad, deleteVariedad, desactivarVariedad, getVariedad, getVariedades, updateVariedad } from "../controllers/variedad.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationVariedad } from "../validations/variedad.validation.js";

const routerVariedad = Router();

routerVariedad.get("/variedad", verificarUserToken, getVariedades);
routerVariedad.get("/variedad/:id", verificarUserToken, getVariedad);
routerVariedad.post( "/variedad", verificarUserToken, cargarImagen, validationVariedad, createVariedad);
routerVariedad.put( "/variedad/:id", verificarUserToken, cargarImagen, validationVariedad, updateVariedad);
routerVariedad.delete("/variedad/:id", verificarUserToken, deleteVariedad);
routerVariedad.put("/variedadac/:id", verificarUserToken, activarVariedad);
routerVariedad.put("/variedaddes/:id", verificarUserToken, desactivarVariedad);

export default routerVariedad;
