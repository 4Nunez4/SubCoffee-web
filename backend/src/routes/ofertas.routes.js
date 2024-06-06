import { Router } from 'express';
import { validarRegistrarOfertas } from '../validations/ofertas.validacion.js';
import { verificarUserToken } from '../controllers/autenticacionController.js';
import { listarOfertas, guardarOfertas, buscarOferta, atualizarOfertas, eliminarOferta, buscarOfertaMayor } from '../controllers/ofertas.Controller.js';

const ofertasRoutes = Router();

ofertasRoutes.post('/oferta', verificarUserToken, validarRegistrarOfertas, guardarOfertas);
ofertasRoutes.get('/oferta', verificarUserToken, listarOfertas);
ofertasRoutes.put('/oferta/:id', verificarUserToken, atualizarOfertas);
ofertasRoutes.get('/oferta/:id', verificarUserToken, buscarOferta);
ofertasRoutes.get('/ofertamayor/:id', verificarUserToken, buscarOfertaMayor);
ofertasRoutes.delete('/oferta/:id/:user', verificarUserToken, eliminarOferta);

export default ofertasRoutes;
