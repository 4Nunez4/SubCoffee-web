import { check } from "express-validator"



export const validarguardarPostulacion = [
    check("oferta_pos", "El precio no puede superar los 15 caracteres").not().isEmpty().isLength({ max: 12 }),
    check(
        "fk_id_usuario", "La identificacion no fue encontrada." ).not().isEmpty().isInt({ min: 1 }).toInt().isNumeric({ no_symbols: true }).isLength({ max: 15}),
        check("estado_pos", "El estado es obligatorio por favor ingrese uno de los dos estados permitidos (activo, inactivo)").not().isEmpty().custom((value)=>{
            const estado =['activo','inactivo'];
            if(!estado.includes(value)){
                throw new Error("Estado no valido")
            }
            return true;
        })
];

export const validarActualizacionPos = [
    check("oferta_pos")
        .not().isEmpty().withMessage("El campo no puede estar vacío, por favor ingrese un valor")
        //al colocarlo asi solo aparecera un mensaje al no cumplir alguna condicion
        .isLength({ max: 12 }).withMessage("Solo se permiten números, con un máximo de 12 caracteres")
        .isNumeric({ no_symbols: true }).withMessage("Por favor ingrese un número válido"),
    check("oferta_pos")
        .isInt({ min: 1 }).withMessage("Por favor ingrese un número mayor a cero, no se aceptan negativos"),
        check("estado_pos", "El estado es obligatorio por favor ingrese uno de los dos estados permitidos (activo, inactivo)").not().isEmpty().custom((value)=>{
            const estado =['activo','inactivo'];
            if(!estado.includes(value)){
                throw new Error("Estado no valido,solo se permite estado 'activo', 'inactivo'")
            }
            return true;
        })
];
