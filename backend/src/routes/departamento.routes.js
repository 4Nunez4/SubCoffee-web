import { Router } from "express";
import { 
    getDepartamentos, 
    getDepartamentoById, 
    createDepartamento, 
    updateDepartamento, 
    deleteDepartamento, 
    activarDepartamento, 
    desactivarDepartamento, 
    getDepartamentosActivos 
} from "../controllers/departamento.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerDepartamento = Router();

routerDepartamento.get("/departamentos", verificarUserToken, getDepartamentos);
routerDepartamento.get("/departamentos_activos", verificarUserToken, getDepartamentosActivos);
routerDepartamento.get("/departamentos/:id", verificarUserToken, getDepartamentoById);
routerDepartamento.post("/departamentos", verificarUserToken, createDepartamento);
routerDepartamento.put("/departamentos/:id", verificarUserToken, updateDepartamento);
routerDepartamento.delete("/departamentos/:id", verificarUserToken, deleteDepartamento);
routerDepartamento.put("/departamentosac/:id", verificarUserToken, activarDepartamento);
routerDepartamento.put("/departamentosdes/:id", verificarUserToken, desactivarDepartamento);

export default routerDepartamento;