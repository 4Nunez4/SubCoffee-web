import { check } from "express-validator";

export const validationCreateFinca = [
  check("nombre_fin", "El nombre de la finca es obligatorio")
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
  check("imagen_fin", "La imagen de la finca es obligatoria")
    .optional(),
  check("fk_id_usuario", "El ID de usuario es obligatorio")
    .not()
    .isEmpty()
    .optional()
    .isNumeric({ no_symbols: true }),
  check("fk_vereda", "La vereda es obligatoria")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true }),
];