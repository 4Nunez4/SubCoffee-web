import{Router} from 'express';
import { check } from 'express-validator';
 import{getPostulaciones,guardarPostulacion, getPostulacion,updatePostulacion, deletePostulacion} from '../controllers/postulacion.controllers.js';
 import { validarguardarPostulacion,validarActualizacionPos } from '../validation/postulacion.validation.js';


    const postulacionRoutes= Router();



    // postulacionRoutes.post('/postulacion',guardarPostulacion);
    // postulacionRoutes.put('/postulacion/:id',editarPostulacion);
    // postulacionRoutes.delete('/postulacion',eliminarPostulacion);
    postulacionRoutes.get('/postulacion', getPostulaciones);
    postulacionRoutes.post('/postulacion',validarguardarPostulacion, guardarPostulacion);
    postulacionRoutes.get('/postulacion/:id', getPostulacion);
    postulacionRoutes.put('/postulacion/:id',validarActualizacionPos, updatePostulacion);
    postulacionRoutes.delete('/postulacion/:id', deletePostulacion)


    export default postulacionRoutes;
