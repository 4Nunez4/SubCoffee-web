import { Router } from "express";
import { activarUsuario, cargarImagen, createUser, deleteUser, desactivarUsuario, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationRegisterUser, validationUpdateUser } from "../validations/user.validation.js";

const routerUser = Router();

routerUser.get("/users", verificarUserToken, getUsers);
routerUser.get("/users/:id", verificarUserToken, getUser);
routerUser.post("/users", verificarUserToken, cargarImagen, createUser);
routerUser.put("/users/:id", verificarUserToken, cargarImagen, updateUser);
routerUser.delete("/users/:id", verificarUserToken, deleteUser);
routerUser.put("/usersac/:id", verificarUserToken, activarUsuario);
routerUser.put("/usersdes/:id", verificarUserToken, desactivarUsuario);

export default routerUser;