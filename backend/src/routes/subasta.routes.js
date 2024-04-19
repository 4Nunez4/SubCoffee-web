import { Router } from "express";
import {
  SubastaAbierta,
  SubastaCerrada,
  SubastaEspera,
  SubastaProceso,
  subastaFiles,
  listar,
  registrar,
  actualizar,
  buscar,
  eliminar,
} from "../controllers/subasta.controllers.js";
import {
  validarActualizarSubasta,
  validarRegistrarSubasta,
} from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router();

router.post(
  "/registrar",
  subastaFiles,
  verificarUserToken,
  validarRegistrarSubasta,
  registrar
);
router.get("/listar", verificarUserToken, listar);
router.put(
  "/actualizar/:id",
  subastaFiles,
  verificarUserToken,
  validarActualizarSubasta,
  actualizar
);
router.get("/buscar/:id", verificarUserToken, buscar);
router.delete("/eliminar/:id", verificarUserToken, eliminar);

router.put("/abierta/:id", verificarUserToken, SubastaAbierta);
router.put("/cerrada/:id", verificarUserToken, SubastaCerrada);
router.put("/espera/:id", verificarUserToken, SubastaEspera);
router.put("/proceso/:id", verificarUserToken, SubastaProceso);

export default router;
