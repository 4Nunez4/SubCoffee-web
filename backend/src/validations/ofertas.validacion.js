import { check } from "express-validator"



export const validarRegistrarOfertas = [
    check('oferta_ofer').not()
    .isEmpty().isNumeric().withMessage('oferta_ofer debe ser un número'),
    check('fk_id_usuario') .not()
    .isEmpty().isNumeric().withMessage('fk_id_usuario debe ser el numero de cedula del usurio'),
    check('fk_id_subasta').isNumeric().withMessage('fk_id_subasta debe ser un número'),
];

export const validarActualizarOfertas = [
    check('oferta_ofer').not()
    .isEmpty().isNumeric().withMessage('oferta_ofer debe ser un número'),
];
