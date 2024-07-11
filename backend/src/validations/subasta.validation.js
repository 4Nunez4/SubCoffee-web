import { check } from "express-validator";

export const validarSubasta = [
  check("fecha_fin_sub","La fecha final debe ser superior a la fecha de inicio")
  .custom((value, { req }) => {
    if (
      req.body.fecha_inicio_sub &&
      new Date(value) >= new Date(req.body.fecha_inicio_sub)
    ) {
      throw new Error("La fecha final debe ser superior a la fecha de inicio");
    }
    return true;
  }),
  check("fecha_inicio_sub","La fecha de inicio debe ser anterior a la fecha de fin")
  .custom((value, { req }) => {
    if (
      req.body.fecha_fin_sub &&
      new Date(value) >= new Date(req.body.fecha_fin_sub)
    ) {
      throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
    }
    return true;
  }),
  check("precio_inicial_sub","El precio inicial es requerido y debe ser un número")
    .not()
    .isEmpty()
    .exists()
    .isNumeric(),
  check("unidad_peso_sub","La unidad de peso es requerida y debe ser una de las siguientes: Gramo, Libra, Kilogramo, Tonelada")
    .not()
    .isEmpty()
    .exists()
    .isIn(["Gramo", "Libra", "Kilogramo", "Tonelada"]),
  check("cantidad_sub", "La cantidad es requerida y debe ser un número")
    .not()
    .isEmpty()
    .exists()
    .isNumeric(),
  check("descripcion_sub", "La descripción es requerida")
    .not()
    .isEmpty()
    .exists()
    .isLength({ min: 1, max: 300 }),
  check("fk_variedad", "La variedad es requerida")
    .not()
    .isEmpty()
    .exists()
    .isNumeric(),
];
