import { check } from "express-validator";

export const validarRegistrarSubasta=[
    check('fecha_inicio_sub','El formato de fecha-hora no es correct')
    .exists()
    .isISO8601()
    .toDate(),

    check('fecha_fin_sub','El formato de fecha-hora no es correcto')
    .exists()
    .isISO8601()
    .toDate(),

    check('estado_sub','Escriba un estado permitido: abierta, espera o cerrada')
    .exists()
    .isIn(['abierta', 'espera', 'cerrada']),
    check('precio_inicial_sub','Por favor, digite una cantidad')
    .exists()
    .isInt(),
];

export const validarActualizarSubasta=[
    check('fecha_inicio_sub','El formato de fecha-hora no es correct')
    .exists()
    .isISO8601()
    .toDate(),

    check('fecha_fin_sub','El formato de fecha-hora no es correcto')
    .exists()
    .isISO8601()
    .toDate(),

    check('estado_sub','Escriba un estado permitido: abierta, espera o cerrada')
    .exists()
    .isIn(['abierta', 'espera', 'cerrada']),
    check('precio_inicial_sub','Por favor, digite una cantidad')
    .exists()
    .isInt(),
]
