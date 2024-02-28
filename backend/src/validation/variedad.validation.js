import { check } from "express-validator";


export const validarGuardarVariedad = [
    check("tipo_vari","Por favor seleccione una variedad valida").not().isEmpty().custom((value)=>{
        const variedades =[ 'Tipica','Borbon','Maragogipe','Tabi','Caturra','Variedad Colombia'];
        if(!variedades.includes(value)){
            throw new Error("Tipo invalido");
        }
        return true;
    }),

    check("descripcion_vari","Por favor ingresar la descripcion de la variedad max 250").not().isEmpty().isLength({max:250}),
    check("puntuacion_vari", "Ingrese la puntuacion de la variedad, solo numeros").not().isEmpty().isInt({ min: 1 }).toInt().isNumeric({ no_symbols: true }).isLength({ max: 15})
 
]
export const validarActualizarVar = [
    check("tipo_vari", "Seleccione una variedad valida").not().isEmpty().custom((value)=>{
        const variedades =['Tipica','Borbon','Maragogipe','Tabi','Caturra','Variedad Colombia'];
        if(!variedades.includes(value)){
            throw new Error("Tipo invalido");
        }
        return true;
    }),
    check("descripcion_vari", "Por favor ingrese la descripcion de la postulacion").not().isEmpty().isLength({max:250}),
    check("puntuacion_vari", "Por favor ingrese un valor en la puntuacion").not().isEmpty().isInt({ min: 1 }).toInt().isNumeric({ no_symbols: true }).isLength({ max: 15})
]