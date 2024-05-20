import { check } from "express-validator";

export const validationVariedad = [
  check("fk_tipo_variedad")
    .notEmpty().withMessage("El tipo de variedad es obligatorio")
    .isLength({ max: 11 }).withMessage("La variedad debe contener menos de 11 caracteres")
    .isInt().isNumeric({ no_symbols:true }),
  check('fk_finca')
    .notEmpty().withMessage("La finca de la variedad es obligatoria")
    .isLength({ max: 11 }).withMessage("La finca de la variedad debe contener menos de 11 caracteres")
    .isInt().isNumeric({ no_symbols:true }),
];