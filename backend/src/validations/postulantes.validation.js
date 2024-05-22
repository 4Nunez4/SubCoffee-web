import { check } from "express-validator";

export const validarGuardarPostulante = [
  check("fk_id_usuario")
    .isNumeric()
    .withMessage("fk_id_usuario debe ser un número"),
  check("fk_id_subasta")
    .isNumeric()
    .withMessage("fk_id_subasta debe ser un número"),
];
