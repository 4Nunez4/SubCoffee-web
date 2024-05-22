import { Router } from "express";
import { activarUsuario, cargarImagen, createImagenUser, createUser, deleteUser, desactivarUsuario, getUser, getUsers, updatePasswordUser, updateUser } from "../controllers/user.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";
import { validationRegisterUser } from "../validations/user.validation.js";

const routerUser = Router();

routerUser.get("/users", verificarUserToken, getUsers);
routerUser.get("/users/:id", verificarUserToken, getUser);
routerUser.post("/users", verificarUserToken, validationRegisterUser, createUser);
routerUser.post("/usersimg", verificarUserToken, cargarImagen, createImagenUser);
routerUser.put("/users/:id", verificarUserToken, validationRegisterUser, updateUser);
routerUser.delete("/users/:id", verificarUserToken, deleteUser);
routerUser.put("/users-password/:id", verificarUserToken, updatePasswordUser);
routerUser.put("/usersac/:id", verificarUserToken, activarUsuario);
routerUser.put("/usersdes/:id", verificarUserToken, desactivarUsuario);

export default routerUser;