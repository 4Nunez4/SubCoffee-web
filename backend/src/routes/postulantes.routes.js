import{Router} from 'express';
 import { validarActualizacionPos, validarGuardarPostulante } from '../validations/postulantes.validation.js';
 import { verificarUserToken } from '../controllers/autenticacionController.js';
import { deletePostulante, getPostulante, getPostulantes, guardarPostulantes, postulacionActiva,postulacionInactiva } from '../controllers/postulantes.controllers.js';

    const postulantesRoutes= Router();

    postulantesRoutes.get('/postulantes',verificarUserToken, getPostulantes);
    postulantesRoutes.post('/postulantes',verificarUserToken,validarGuardarPostulante, guardarPostulantes);
    postulantesRoutes.get('/postulantes/:id',verificarUserToken, getPostulante);
    postulantesRoutes.delete('/postulantes/:id',verificarUserToken, deletePostulante);

    postulantesRoutes.put('/postulantesactivo/:id',verificarUserToken,validarActualizacionPos, postulacionActiva);
    postulantesRoutes.put('/postulantesinactivo/:id',verificarUserToken,validarActualizacionPos, postulacionInactiva);



    export default postulantesRoutes;
   