import { Router } from "express";
<<<<<<< HEAD
import { listar, buscar, eliminar, cargarImagen, registrarSubasta, actualizarSubasta, desactivarSubasta} from "../controllers/subasta.controllers.js";
import { validarActualizarSubasta, validarRegistrarSubasta} from "../validations/subasta.validation.js";
=======
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
>>>>>>> 86238db3e52402c6101782f78cc3b4cf2c2a6359
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router();

<<<<<<< HEAD
router.get("/listar",verificarUserToken, listar)
router.post("/registrar", verificarUserToken, cargarImagen,validarRegistrarSubasta, registrarSubasta)
router.put("/actualizar/:id",verificarUserToken, cargarImagen, validarActualizarSubasta, actualizarSubasta)
router.get("/buscar/:id",verificarUserToken, buscar)
router.delete("/eliminar/:id",verificarUserToken, eliminar)
router.put("/desactivar/:id", verificarUserToken, desactivarSubasta)
=======
router.post("/registrar",subastaFiles,verificarUserToken,validarRegistrarSubasta,registrar);
router.get("/listar", verificarUserToken, listar);
router.put("/actualizar/:id",subastaFiles,verificarUserToken,validarActualizarSubasta,actualizar);
router.get("/buscar/:id", verificarUserToken, buscar);
router.delete("/eliminar/:id", verificarUserToken, eliminar);
router.put("/abierta/:id", verificarUserToken, SubastaAbierta);
router.put("/cerrada/:id", verificarUserToken, SubastaCerrada);
router.put("/espera/:id", verificarUserToken, SubastaEspera);
router.put("/proceso/:id", verificarUserToken, SubastaProceso);
>>>>>>> 86238db3e52402c6101782f78cc3b4cf2c2a6359

export default router;
