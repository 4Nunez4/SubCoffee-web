import { Router } from "express";
import { validarPostulante } from "../validations/postulantes.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import {
  deletePostulante,
  getPostulanteesActivos,
  getPostulantes,
  guardarPostulantes,
  postulacionActiva,
  postulacionInactiva,
} from "../controllers/postulantes.controllers.js";

const routerPostulantes = Router();

routerPostulantes.get("/postulantes_sub/:id", verificarUserToken, getPostulantes);
routerPostulantes.post("/postulantes", verificarUserToken, validarPostulante, guardarPostulantes);
routerPostulantes.get("/postulantes_activos/:id", verificarUserToken, getPostulanteesActivos);
routerPostulantes.delete("/postulantes/:id",verificarUserToken, deletePostulante);

routerPostulantes.put("/postulantesactivo/:id",verificarUserToken, postulacionActiva);
routerPostulantes.put("/postulantesinactivo",verificarUserToken, postulacionInactiva);

export default routerPostulantes;
