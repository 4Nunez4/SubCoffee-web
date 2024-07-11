import { Router } from 'express';
import { validarOfertas } from '../validations/ofertas.validacion.js';
import { verificarUserToken } from '../controllers/autenticacionController.js';
import { listarOfertas, guardarOfertas, buscarOferta, atualizarOfertas, eliminarOferta, buscarOfertaMayor } from '../controllers/ofertas.Controller.js';

const routerOferta = Router();

routerOferta.post('/oferta', verificarUserToken, validarOfertas, guardarOfertas);
routerOferta.get('/oferta', verificarUserToken, listarOfertas);
routerOferta.put('/oferta/:id', verificarUserToken, validarOfertas, atualizarOfertas);
routerOferta.get('/oferta/:id', verificarUserToken, buscarOferta);
routerOferta.get('/ofertamayor/:id', verificarUserToken, buscarOfertaMayor);
routerOferta.delete('/oferta/:id/:user', verificarUserToken, eliminarOferta);

export default routerOferta;
