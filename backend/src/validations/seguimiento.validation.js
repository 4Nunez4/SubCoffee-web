import { check } from "express-validator";

export const validarRegistrarSeguimiento = [
  check("nombre_seg", "Ingrese hasta un maximo de 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
  check("imagen_seg")
    .exists()
    .withMessage("La imagen es obligatoria")
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value === null || value === undefined) {
        throw new Error("La imagen no puede ser nula");
      }

      if (value === "") {
        throw new Error("La imagen no puede estar vacía");
      }

      if (!isNaN(value)) {
        throw new Error("La imagen no puede ser un número");
      }
      return true;
    }),
  check("fk_id_produccion", "Digite un id registrado")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt(),
  check("fk_id_usuario", "Digite un id registrado")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt(),
];

export const validarActualizarSeguimiento = [
  check("nombre_seg", "Ingrese hasta un maximo de 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
  check("imagen_seg")
    .exists()
    .withMessage("La imagen es obligatoria")
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value === null || value === undefined) {
        throw new Error("La imagen no puede ser nula");
      }

      if (value === "") {
        throw new Error("La imagen no puede estar vacía");
      }

      if (!isNaN(value)) {
        throw new Error("La imagen no puede ser un número");
      }
      return true;
    }),
  check("fk_id_produccion", "Digite un id registrado")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt(),
  check("fk_id_usuario", "Digite un id registrado")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt(),
  check("estado_seg", "Escriba un estado permitido: activo o inactivo")
    .exists()
    .isIn(["abierta", "activo", "inactivo"]),
];
