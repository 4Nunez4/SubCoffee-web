import { check } from "express-validator";

export const validationVariedad = [
  check("fk_tipo_variedad")
    .notEmpty().withMessage("El tipo de variedad es obligatorio")
    .isLength({ max: 11 }).withMessage("La variedad debe contener menos de 11 caracteres")
    .isInt().isNumeric({ no_symbols:true }),
  check("descripcion_vari")
    .notEmpty().withMessage("La descripcion de la variedad es obligatoria")
    .isLength({ max: 300 }).withMessage("La variedad debe contener menos de 300 caracteres"),
  check('imagen_vari')
    .optional()
    .notEmpty().withMessage("La imagen de la variedad es obligatoria")
    .isLength({ max: 100 }).withMessage("La imagen de la variedad debe contener menos de 100 caracteres"),
  check('fk_finca')
    .notEmpty().withMessage("La finca de la variedad es obligatoria")
    .isLength({ max: 11 }).withMessage("La finca de la variedad debe contener menos de 11 caracteres")
    .isInt().isNumeric({ no_symbols:true }),
];


export const validarGuardarVariedad = [
    check("tipo_vari","Por favor seleccione una variedad valida").not().isEmpty().custom((value)=>{
        const variedades =[ 'Tipica','Borbon','Maragogipe','Tabi','Caturra','Variedad Colombia'];
        if(!variedades.includes(value)){
            throw new Error("Tipo invalido");
        }
        return true;
    }),

    check("descripcion_vari","Por favor ingresar la descripcion de la variedad max 250").not().isEmpty().isLength({max:250}),
    check("puntuacion_vari", "Ingrese la puntuacion de la variedad, solo numeros").not().isEmpty().isInt({ min: 1 }).toInt().isNumeric({ no_symbols: true }).isLength({ max: 15}),
    check("estado_vari", "El estado es obligatorio por favor ingrese uno de los dos estados permitidos (activo, inactivo)").not().isEmpty().custom((value)=>{
        const estado =['activo','inactivo'];
        if(!estado.includes(value)){
            throw new Error("Estado no valido")
        }
        return true;
    }),
    check("fk_finca", "Digite un id registrado")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt(),
 
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
    check("puntuacion_vari", "Por favor ingrese un valor en la puntuacion").not().isEmpty().isInt({ min: 1 }).toInt().isNumeric({ no_symbols: true }).isLength({ max: 15}),
    check("estado_vari", "El estado es obligatorio por favor ingrese uno de los dos estados permitidos").not().isEmpty().custom((value)=>{
        const estado =['activo','inactivo'];
        if(!estado.includes(value)){
            throw new Error("Estado no valido")
        }
        return true;
    }),
    check("fk_finca", "Digite un id registrado")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt(),
]