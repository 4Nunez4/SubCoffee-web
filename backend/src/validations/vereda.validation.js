import { check } from "express-validator";

export const validationVereda = [
  check("nombre_vere", "El nombre de la vereda es obligatorio max:255")
    .not()
    .isEmpty()
    .isLength({ max: 255 }),
  check("fk_municipio", "El fk del municipio es obligatorio")
    .not()
    .isEmpty()
    .isInt()
    .isNumeric({ no_symbols: true }),
];
