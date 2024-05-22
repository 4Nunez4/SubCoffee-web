import { Router } from "express";
import { 
    getMunicipios, 
    getMunicipioById, 
    createMunicipio, 
    updateMunicipio, 
    deleteMunicipio, 
    activarMunicipio, 
    desactivarMunicipio, 
    getMuniForDepart, 
    getMuniForDepartActivos 
} from "../controllers/municipio.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationMunicipio } from "../validations/municipio.validation.js";

const routerMunicipio = Router();

routerMunicipio.get("/municipios", verificarUserToken, getMunicipios);
routerMunicipio.get("/municipios_activos/:id", verificarUserToken, getMuniForDepartActivos);
routerMunicipio.get("/municipios/:id", verificarUserToken, getMunicipioById);
routerMunicipio.get("/municipiosdep/:id", verificarUserToken,  getMuniForDepart);
routerMunicipio.post("/municipios", verificarUserToken, validationMunicipio, createMunicipio);
routerMunicipio.put("/municipios/:id", verificarUserToken, validationMunicipio, updateMunicipio);
routerMunicipio.delete("/municipios/:id", verificarUserToken, deleteMunicipio);
routerMunicipio.put("/municipiosac/:id", verificarUserToken, activarMunicipio);
routerMunicipio.put("/municipiosdes/:id", verificarUserToken, desactivarMunicipio);

export default routerMunicipio;
