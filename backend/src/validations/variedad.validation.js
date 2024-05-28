import { check } from "express-validator";

export const validationVariedad = [
  check("fk_tipo_variedad")
    .notEmpty()
    .withMessage("El tipo de variedad es obligatorio")
    .isInt()
    .isNumeric({ no_symbols:true }),
  check('fk_finca')
    .notEmpty()
    .withMessage("La finca de la variedad es obligatoria")
    .isInt()
    .isNumeric({ no_symbols:true }),
];