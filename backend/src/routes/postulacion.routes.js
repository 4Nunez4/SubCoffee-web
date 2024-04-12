import{Router} from 'express';
 import{getPostulaciones,guardarPostulacion, getPostulacion,updatePostulacion, deletePostulacion, desactivarPostulacion, activarPostulacion} from '../controllers/postulacion.controllers.js';
 import { validarguardarPostulacion,validarActualizacionPos } from '../validations/postulacion.validation.js';
 import { verificarUserToken } from '../controllers/autenticacionController.js';

    const postulacionRoutes= Router();



    // postulacionRoutes.post('/postulacion',guardarPostulacion);
    // postulacionRoutes.put('/postulacion/:id',editarPostulacion);
    // postulacionRoutes.delete('/postulacion',eliminarPostulacion);
    postulacionRoutes.get('/postulacion',verificarUserToken, getPostulaciones);
    postulacionRoutes.post('/postulacion',verificarUserToken,validarguardarPostulacion, guardarPostulacion);
    postulacionRoutes.get('/postulacion/:id',verificarUserToken, getPostulacion);
    postulacionRoutes.put('/postulacion/:id',verificarUserToken,validarActualizacionPos, updatePostulacion);
    postulacionRoutes.delete('/postulacion/:id',verificarUserToken, deletePostulacion);
    postulacionRoutes.put('/desactivar/:id',verificarUserToken, desactivarPostulacion)
    postulacionRoutes.put('/activar/:id',verificarUserToken,activarPostulacion)



    export default postulacionRoutes;
   