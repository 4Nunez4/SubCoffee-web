import{Router} from 'express';
 import { validarActualizacionPos, validarGuardarPostulante } from '../validations/postulantes.validation.js';
 import { verificarUserToken } from '../controllers/autenticacionController.js';
import { deletePostulante, getPostulante, getPostulantes, guardarPostulantes } from '../controllers/postulantes.controllers.js';

    const postulantesRoutes= Router();

    postulantesRoutes.get('/postulantes',verificarUserToken, getPostulantes);
    postulantesRoutes.post('/postulantes',verificarUserToken,validarGuardarPostulante, guardarPostulantes);
    postulantesRoutes.get('/postulantes/:id',verificarUserToken, getPostulante);
    postulantesRoutes.delete('/postulantes/:id',verificarUserToken, deletePostulante);
    // postulacionRoutes.put('/postulantes/:id',verificarUserToken,validarActualizacionPos, updatePostulacion);
    /* postulacionRoutes.put('/desactivar/:id',verificarUserToken, desactivarPostulacion)
    postulacionRoutes.put('/activar/:id',verificarUserToken,activarPostulacion) */


    export default postulantesRoutes;
   