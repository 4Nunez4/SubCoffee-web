import { check } from "express-validator";

export const validationRegisterUser = [
  check("pk_cedula_user", "La cedula es obligatorio, max 11 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 11 })
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("nombre_user", "El nombre es obligatorio, max 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
  check("email_user", "El email es obligatorio, max 50 caracteres")
    .isEmail()
    .isLength({ max: 50 }),
  check("imagen_user", "La imagen no es tan obligatoria, min 6 caracteres")
    .optional(),
  check("password_user", "La contraseña es obligatoria, min 6 caracteres")
    .not()
    .isEmpty()
    .optional()
    .isLength({ max: 50, min: 6 }),
  check("telefono_user", "El Telefono es obligatorio, max 10 caracteres")
    .not()
    .toInt()
    .isEmpty()
    .isNumeric()
    .isLength({ max: 11 }),
  check("rol_user", "El rol es obligatorio")
    .not()
    .isEmpty()
    .optional()
    .custom((values) => {
      const rol_user = ["vendedor", "comprador", "admin"];
      if (!rol_user.includes(values)) {
        throw new Error("Error, ingrese el error permitido");
      }
      return true;
    }),
];
