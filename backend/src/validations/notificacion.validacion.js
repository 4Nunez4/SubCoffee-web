import { check } from "express-validator";

export const validateCreateNotificacion = [
  check("tipo_not", "El tipo de notificacion es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const tiposPermitidos = ["oferta", "mensaje", "cierre"];
      if (!tiposPermitidos.includes(value)) {
        throw new Error("Tipo inválido");
      }
      return true;
    }),
  check(
    "texto_not",
    "El texto de la notificacion es obligatorio, maximo 100 caracteres"
  )
    .not()
    .isEmpty()
    .isLength({ max: 100 }),
  check(
    "fk_id_subasta",
    "El id_subasta es oblidatorio, el campo debe ser numerico sin signos"
  )
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt()
    .isLength({ max: 100 })
    .isNumeric({ no_symbols: true }),
  check(
    "fk_id_usuario",
    "El id_usuario es oblidatorio, el campo debe ser numerico sin signos"
  )
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt()
    .isLength({ max: 100 })
    .isNumeric({ no_symbols: true }),
];

export const validateActualizarNotificacion = [
  check("tipo_not", "El tipo de notificacion es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const tiposPermitidos = ["oferta", "mensaje", "cierre"];
      if (!tiposPermitidos.includes(value)) {
        throw new Error("Tipo inválido");
      }
      return true;
    }),
  check(
    "texto_not",
    "El texto de la notificacion es obligatorio, maximo 100 caracteres"
  )
    .not()
    .isEmpty()
    .isLength({ max: 100 }),
];
