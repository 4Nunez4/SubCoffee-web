 import{Router} from 'express';
      

 import{guardarVariedad,actualizarVariedad,listarVariedad,buscarvariedad, deleteVariedad} from '../controllers/variedad.controllers.js';

 const variedadesRoute= Router();



 variedadesRoute.post('/variedad',guardarVariedad);
 variedadesRoute.put('/variedad/:id',actualizarVariedad);
 variedadesRoute.get('/variedad',listarVariedad);
 variedadesRoute.get('/variedad/:id',buscarvariedad);
 variedadesRoute.delete('/variedad/:id',deleteVariedad)



 export default variedadesRoute;
