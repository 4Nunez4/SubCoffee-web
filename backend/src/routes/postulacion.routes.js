import{Router} from 'express';
        

 import{getPostulaciones,guardarPostulacion, getPostulacion,updatePostulacion, deletePostulacion} from '../controllers/postulacion.controllers.js';

    const postulacionRoutes= Router();



    // postulacionRoutes.post('/postulacion',guardarPostulacion);
    // postulacionRoutes.put('/postulacion/:id',editarPostulacion);
    // postulacionRoutes.delete('/postulacion',eliminarPostulacion);
    postulacionRoutes.get('/postulacion', getPostulaciones);
    postulacionRoutes.post('/postulacion', guardarPostulacion);
    postulacionRoutes.get('/postulacion/:id', getPostulacion);
    postulacionRoutes.put('/postulacion/:id', updatePostulacion);
    postulacionRoutes.delete('/postulacion/:id', deletePostulacion)


    export default postulacionRoutes;
