import { Router } from "express";
import { validarGuardarPostulante } from "../validations/postulantes.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import {
  deletePostulante,
  getPostulanteesActivos,
  getPostulantes,
  guardarPostulantes,
  postulacionActiva,
  postulacionInactiva,
} from "../controllers/postulantes.controllers.js";

const postulantesRoutes = Router();

postulantesRoutes.get("/postulantes_sub/:id", verificarUserToken, getPostulantes);
postulantesRoutes.post("/postulantes", verificarUserToken, validarGuardarPostulante, guardarPostulantes);
postulantesRoutes.get("/postulantes_activos/:id", verificarUserToken, getPostulanteesActivos);
postulantesRoutes.delete("/postulantes/:id",verificarUserToken, deletePostulante);

postulantesRoutes.put("/postulantesactivo/:id",verificarUserToken, postulacionActiva);
postulantesRoutes.put("/postulantesinactivo",verificarUserToken, postulacionInactiva);

export default postulantesRoutes;
