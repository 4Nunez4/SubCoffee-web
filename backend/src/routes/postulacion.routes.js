import{Router} from 'express';
        

import{guardarPostulacion,editarPostulacion,eliminarPostulacion,getPostulacion} from '../controllers/postulacion.controllers.js';

const variedadesRoute= Router();



variedadesRoute.post('/registrar',guardarPostulacion);
variedadesRoute.put('/actualizar/:id',editarPostulacion);
variedadesRoute.get('/listar',eliminarPostulacion);
variedadesRoute.get('/buscar/:id',getPostulacion);



export default variedadesRoute;
