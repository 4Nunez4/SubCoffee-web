import { Router } from "express";
import { activarTipoVariedad, createTipoVariedad, deleteTipoVariedad, desactivarTipoVariedad, getTipoVariedad, getTipoVariedades, updateTipoVariedad } from "../controllers/tipovari.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationTipoVariedad } from "../validations/tipo_variedad.validation.js";
const routertipovari = Router();

routertipovari.get("/tipo_vari", verificarUserToken, getTipoVariedades);
routertipovari.get("/tipo_vari/:id", verificarUserToken, getTipoVariedad);
routertipovari.post("/tipo_vari", verificarUserToken, validationTipoVariedad, createTipoVariedad);
routertipovari.put("/tipo_vari/:id", verificarUserToken, validationTipoVariedad, updateTipoVariedad);
routertipovari.delete("/tipo_vari/:id", verificarUserToken, deleteTipoVariedad);
routertipovari.put("/tipo_variac/:id", verificarUserToken, activarTipoVariedad);
routertipovari.put("/tipo_varides/:id",verificarUserToken,desactivarTipoVariedad);

export default routertipovari;
