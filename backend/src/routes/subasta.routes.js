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
  listarSubsActivas,
  getSubGanador,
  updateSubGanador,
  designarDatos,
} from "../controllers/subasta.controllers.js";
import { validarSubasta } from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerSubasta = Router();

routerSubasta.post("/subasta/:id", subastaFiles, verificarUserToken, registrar);


routerSubasta.get("/subasta", verificarUserToken, listar);
routerSubasta.put("/subasta/:id", verificarUserToken, subastaFiles, actualizar);
routerSubasta.get("/buscar/:id", verificarUserToken, buscar); 
routerSubasta.delete("/eliminar/:id", verificarUserToken, eliminar);
routerSubasta.put("/subastaac/:id", verificarUserToken, SubastaAbierta);
routerSubasta.put("/subastades/:id", verificarUserToken, SubastaCerrada);
routerSubasta.put("/espera/:id", verificarUserToken, SubastaEspera);
routerSubasta.put("/proceso/:id", verificarUserToken, SubastaProceso);

routerSubasta.get("/buscarsubforuser/:id", verificarUserToken, buscarSubastaForUser); 
routerSubasta.put("/eliminardatos/:id", verificarUserToken, designarDatos);
routerSubasta.get("/subastaganador/:id", verificarUserToken, getSubGanador);
routerSubasta.get("/subastasActivasMenosCerradas", verificarUserToken, listarSubsActivas);

routerSubasta.put("/subastaganador/:id", verificarUserToken, updateSubGanador);

export default routerSubasta;