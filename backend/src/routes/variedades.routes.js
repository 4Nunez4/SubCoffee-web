 import{Router} from 'express';
      import { validartoken } from '../controllers/autenticacionController.js';

 import{guardarVariedad,actualizarVariedad,listarVariedad,buscarvariedad, deleteVariedad,desactivarVariedad} from '../controllers/variedad.controllers.js';
import { validarGuardarVariedad, validarActualizarVar } from '../validations/variedad.validation.js';
 const variedadesRoute= Router();



 variedadesRoute.post('/variedad',validartoken,validarGuardarVariedad, guardarVariedad);
 variedadesRoute.put('/variedad/:id',validartoken,validarActualizarVar,actualizarVariedad);
 variedadesRoute.get('/variedad',validartoken,listarVariedad);
 variedadesRoute.get('/variedad/:id',validartoken,buscarvariedad);
 variedadesRoute.put('/desactivar/:id',validartoken, desactivarVariedad)
 variedadesRoute.delete('/variedad/:id',validartoken,deleteVariedad)



 export default variedadesRoute;
