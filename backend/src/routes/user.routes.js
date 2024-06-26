import { Router } from "express";
import { activarUsuario, cargarImagen, createUser, deleteUser, desactivarUsuario, getUser, getUsers, updatePasswordUser, updatePasswordUserLogin, updateUser } from "../controllers/user.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationUser } from "../validations/user.validation.js";

const routerUser = Router();

routerUser.get("/users", verificarUserToken, getUsers);
routerUser.get("/users/:id", verificarUserToken, getUser);
routerUser.post("/users", verificarUserToken, cargarImagen, validationUser, createUser);
routerUser.put("/users/:id", verificarUserToken, cargarImagen, validationUser, updateUser);
routerUser.delete("/users/:id", verificarUserToken, deleteUser);
routerUser.put("/users-password/:id", verificarUserToken, updatePasswordUser);
routerUser.put("/recuperarpassword", updatePasswordUserLogin);
routerUser.put("/usersac/:id", verificarUserToken, activarUsuario);
routerUser.put("/usersdes/:id", verificarUserToken, desactivarUsuario);

export default routerUser;