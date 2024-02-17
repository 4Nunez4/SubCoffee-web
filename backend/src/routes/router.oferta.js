import { Router } from "express";
import { registrarOferta, actualizarOferta, buscarOferta, borrarOferta, listarOferta } from "../controllers/controller.oferta.js";
const rutaOferta = Router();

rutaOferta.post('/registrarOferta',registrarOferta);
rutaOferta.put('/actualizarOferta/:id',actualizarOferta);
rutaOferta.get('/buscarOferta/:id',buscarOferta);
rutaOferta.delete('/borrarOferta/:id',borrarOferta);
rutaOferta.get('/listarOferta',listarOferta);

export default rutaOferta;