 import{Router} from 'express';
      import { verificarUserToken } from '../controllers/autenticacionController.js';

 import{guardarVariedad,actualizarVariedad,listarVariedad,buscarvariedad, deleteVariedad,desactivarVariedad, activarVariedad, cargarImagen} from '../controllers/variedad.controllers.js';
import { validarGuardarVariedad, validarActualizarVar } from '../validations/variedad.validation.js';
 const variedadesRoute= Router();



 variedadesRoute.post('/variedad',verificarUserToken,cargarImagen,validarGuardarVariedad, guardarVariedad);
 variedadesRoute.put('/variedad/:id',verificarUserToken,validarActualizarVar,actualizarVariedad);
 variedadesRoute.get('/variedad',verificarUserToken, listarVariedad);
 variedadesRoute.get('/variedad/:id',verificarUserToken,buscarvariedad);
 variedadesRoute.put('/desactivar/:id',verificarUserToken, desactivarVariedad)
 variedadesRoute.delete('/variedad/:id',verificarUserToken,deleteVariedad)
 variedadesRoute.put('/activar/:id',verificarUserToken, activarVariedad)



 export default variedadesRoute;
