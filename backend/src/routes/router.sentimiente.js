import { Router } from "express";
import { registrarSentimiento, listarSentimiento, actualizarSentimiento, buscarSentimiento, borrarSentimiento } from "../controllers/controller.sentimiento.js";
const rutaSentimiento = Router();

rutaSentimiento.post('/registrarSentimiento',registrarSentimiento);
rutaSentimiento.put('/actualizarSentimiento/:id',actualizarSentimiento);
rutaSentimiento.get('/buscarSentimiento/:id',buscarSentimiento);
rutaSentimiento.delete('/borrarSentimiento/:id',borrarSentimiento);
rutaSentimiento.get('/listarSentimiento',listarSentimiento);

export default rutaSentimiento;