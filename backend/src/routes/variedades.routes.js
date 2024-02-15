import{Router} from 'express';
        

import{guardarVariedad,actualizarVariedad,listarVariedad,buscarvariedad} from '../controllers/variedad.controllers.js';

const variedadesRoute= Router();



variedadesRoute.post('/registrar',guardarVariedad);
variedadesRoute.put('/actualizar/:id',actualizarVariedad);
variedadesRoute.get('/listar',listarVariedad);
variedadesRoute.get('/buscar/:id',buscarvariedad);



export default variedadesRoute;
