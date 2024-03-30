import { check } from "express-validator";

export const validarCreateChat = [
  check("mensaje_chat", "El mensaje es obligatorio, maximo 100 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 100 }),
  check("fk_id_subasta","El id subasta es obligatorio y debe ser numerico sin signos")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt()
    .isNumeric({ no_symbols: true })
    .isLength({ max: 100 }),
  check("fk_id_usuario","El id subasta es obligatorio y debe ser numerico sin signos")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt()
    .isNumeric({ no_symbols: true })
    .isLength({ max: 15 }),
];

export const validarActualizarChat = [
  check("mensaje_chat", "El mensaje es obligatorio, maximo 100 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 100 }),
];
