import{Router} from 'express';
 import { validarActualizarOfertas,validarRegistrarOfertas } from '../validations/ofertas.validacion.js';
 import { verificarUserToken } from '../controllers/autenticacionController.js';
import { listarOfertas,guardarOfertas,buscarOferta,atualizarOfertas,eliminarOferta } from '../controllers/ofertas.Controller.js';

    const ofertasRoutes= Router();
  ofertasRoutes.post('/oferta',verificarUserToken,validarRegistrarOfertas, guardarOfertas);

    ofertasRoutes.get('/oferta',verificarUserToken, listarOfertas);
  
    ofertasRoutes.put('/oferta/:id',verificarUserToken, validarActualizarOfertas,atualizarOfertas );

    ofertasRoutes.get('/oferta/:id',verificarUserToken, buscarOferta);

    ofertasRoutes.delete('/oferta/:id',verificarUserToken, eliminarOferta);



    export default ofertasRoutes;
   