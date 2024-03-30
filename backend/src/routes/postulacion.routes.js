import{Router} from 'express';
 import{getPostulaciones,guardarPostulacion, getPostulacion,updatePostulacion, deletePostulacion, desactivarPostulacion, activarPostulacion} from '../controllers/postulacion.controllers.js';
 import { validarguardarPostulacion,validarActualizacionPos } from '../validations/postulacion.validation.js';
 import { validartoken } from '../controllers/autenticacionController.js';

    const postulacionRoutes= Router();



    // postulacionRoutes.post('/postulacion',guardarPostulacion);
    // postulacionRoutes.put('/postulacion/:id',editarPostulacion);
    // postulacionRoutes.delete('/postulacion',eliminarPostulacion);
    postulacionRoutes.get('/postulacion',validartoken, getPostulaciones);
    postulacionRoutes.post('/postulacion',validartoken,validarguardarPostulacion, guardarPostulacion);
    postulacionRoutes.get('/postulacion/:id',validartoken, getPostulacion);
    postulacionRoutes.put('/postulacion/:id',validartoken,validarActualizacionPos, updatePostulacion);
    postulacionRoutes.delete('/postulacion/:id',validartoken, deletePostulacion);
    postulacionRoutes.put('/desactivar/:id',validartoken, desactivarPostulacion)
    postulacionRoutes.put('/activar/:id',validartoken,activarPostulacion)



    export default postulacionRoutes;
   