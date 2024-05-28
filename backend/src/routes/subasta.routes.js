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
  buscarSubastaForUser,
  actualizarFechaFin,
  listarSubsActivas,
} from "../controllers/subasta.controllers.js";
import { validarSubasta, } from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const router = Router();

router.post("/subasta", subastaFiles, verificarUserToken, registrar);
router.get("/subasta", verificarUserToken, listar);
router.get("/subastasActivasMenosCerradas", verificarUserToken, listarSubsActivas);
router.put("/subasta/:id",subastaFiles,verificarUserToken, actualizar);
router.get("/buscar/:id", verificarUserToken, buscar); 
router.get("/buscarsubforuser/:id", verificarUserToken, buscarSubastaForUser); 
router.delete("/eliminar/:id", verificarUserToken, eliminar);

router.put("/subastaac/:id", verificarUserToken, SubastaAbierta);
router.put("/subastafecha/:id", verificarUserToken, actualizarFechaFin);
router.put("/subastades/:id", verificarUserToken, SubastaCerrada);
router.put("/espera/:id", verificarUserToken, SubastaEspera);
router.put("/proceso/:id", verificarUserToken, SubastaProceso);

export default router;
