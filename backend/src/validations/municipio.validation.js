import { check } from "express-validator";

export const validationMunicipio = [
  check("pk_codigo_muni", "El código es obligatorio")
    .not()
    .isEmpty()
    .isInt()
    .isNumeric({ no_symbols: true }),
  check("nombre_muni", "El nombre del municipio es obligatorio max:255")
    .not()
    .isEmpty()
    .isLength({ max: 255 }),
  check("fk_departamento", "El fk departamento es obligatorio")
    .not()
    .isEmpty()
    .isInt()
    .isNumeric({ no_symbols: true }),
];
