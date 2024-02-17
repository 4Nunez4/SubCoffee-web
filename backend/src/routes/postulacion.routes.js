import{Router} from 'express';
        

import{guardarPostulacion,editarPostulacion,eliminarPostulacion,getPostulacion} from '../controllers/postulacion.controllers.js';

const variedadesRoute= Router();



variedadesRoute.post('/guardarPostulacion',guardarPostulacion);
variedadesRoute.put('/editarPostulacion/:id',editarPostulacion);
variedadesRoute.get('/eliminarPostulacion',eliminarPostulacion);
variedadesRoute.get('/getPostulacion/:id',getPostulacion);



export default variedadesRoute;
