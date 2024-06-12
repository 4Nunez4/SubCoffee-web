import { Router } from "express";
import { createPostulacion, deletePostulacion, getPostulacion, getPostulaciones, updatePostulacion } from "../controllers/postulacion.controller.js";

const routerPostulacion = Router()

routerPostulacion.get("/postulacion", getPostulaciones)
routerPostulacion.get("/postulacion/:id", getPostulacion)
routerPostulacion.post("/postulacion", createPostulacion)
routerPostulacion.put("/postulacion/:id", updatePostulacion)
routerPostulacion.delete("/postulacion/:id", deletePostulacion)

export default routerPostulacion