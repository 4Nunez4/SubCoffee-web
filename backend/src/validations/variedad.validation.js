import { check } from "express-validator";

export const validationVariedad = [
  check("fk_variedad")
    .notEmpty().withMessage("El tipo de variedad es obligatorio")
    .isLength({ max: 11 }).withMessage("La variedad debe contener menos de 11 caracteres")
    .isInt().isNumeric({ no_symbols:true }),
  check("descripcio_vari")
    .notEmpty().withMessage("La descripcion de la variedad es obligatoria")
    .isLength({ max: 300 }).withMessage("La variedad debe contener menos de 300 caracteres"),
  check('imagen_vari')
    .optional()
    .notEmpty().withMessage("La imagen de la variedad es obligatoria")
    .isLength({ max: 100 }).withMessage("La imagen de la variedad debe contener menos de 100 caracteres"),
  check('finca_vari')
    .notEmpty().withMessage("La finca de la variedad es obligatoria")
    .isLength({ max: 11 }).withMessage("La finca de la variedad debe contener menos de 11 caracteres")
    .isInt().isNumeric({ no_symbols:true }),
];
