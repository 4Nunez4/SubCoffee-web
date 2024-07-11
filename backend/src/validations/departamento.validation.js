import { check } from "express-validator";

export const validationDepartamento = [
  check("pk_codigo_depar", "El codigo del departamento es obligatorio")
    .not()
    .isEmpty()
    .toInt()
    .isNumeric({ no_symbols: true }),
  check("nombre_depar", "El nombre del departamento es obligatorio")
    .not()
    .isEmpty()
    .isLength({ max: 25 }),
];