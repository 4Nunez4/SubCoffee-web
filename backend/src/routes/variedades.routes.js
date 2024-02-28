 import{Router} from 'express';
      

 import{guardarVariedad,actualizarVariedad,listarVariedad,buscarvariedad, deleteVariedad} from '../controllers/variedad.controllers.js';
import { validarGuardarVariedad, validarActualizarVar } from '../validation/variedad.validation.js';
 const variedadesRoute= Router();



 variedadesRoute.post('/variedad',validarGuardarVariedad, guardarVariedad);
 variedadesRoute.put('/variedad/:id',validarActualizarVar,actualizarVariedad);
 variedadesRoute.get('/variedad',listarVariedad);
 variedadesRoute.get('/variedad/:id',buscarvariedad);
 variedadesRoute.delete('/variedad/:id',deleteVariedad)



 export default variedadesRoute;
