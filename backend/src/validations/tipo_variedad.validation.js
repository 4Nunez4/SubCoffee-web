import { check } from "express-validator";

export const validationTipoVariedad = [
    check("nombre_tipo_vari", "El nombre del tipo de variedad es obligatorio")
    .not()
    .isEmpty()
    .isLength({ max: 300 }),
]