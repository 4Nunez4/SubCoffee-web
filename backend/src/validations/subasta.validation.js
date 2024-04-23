import { check } from "express-validator";

export const validarRegistrarSubasta=[
    check('fecha_inicio_sub', 'El formato de fecha-hora no es correcto')
    .not()
    .isEmpty()
    .exists()
    .isISO8601(), // Asegura que la fecha esté en formato ISO 8601

 check('fecha_inicio_sub', 'La fecha de inicio debe ser anterior a la fecha de fin')
    .custom((value, { req }) => {
      if (req.body.fecha_fin_sub && new Date(value) >= new Date(req.body.fecha_fin_sub)) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
      }
      return true;
    }),

 check('precio_inicial_sub', 'El precio inicial es requerido y debe ser un número')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que el precio sea un número

 check('precio_final_sub', 'El precio final es requerido y debe ser un número')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que el precio sea un número

 check('unidad_peso_sub', 'La unidad de peso es requerida y debe ser una de las siguientes: Gramo, Libra, Kilogramo, Tonelada')
    .not()
    .isEmpty()
    .exists()
    .isIn(['Gramo', 'Libra', 'Kilogramo', 'Tonelada']), // Verifica que la unidad de peso esté dentro de los valores permitidos

 check('cantidad_sub', 'La cantidad es requerida y debe ser un número')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que la cantidad sea un número

 check('estado_sub', 'El estado es requerido y debe ser uno de los siguientes: abierta, espera, cerrada, proceso')
    .not()
    .isEmpty()
    .exists()
    .isIn(['abierta', 'espera', 'cerrada', 'proceso']), // Verifica que el estado esté dentro de los valores permitidos

 check('descripcion_sub', 'La descripción es requerida')
    .not()
    .isEmpty()
    .exists()
    .isLength({ min: 1, max: 300 }), // Verifica que la descripción tenga una longitud válida

 check('fk_variedad', 'La variedad es requerida')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que la variedad sea un número
];

export const validarActualizarSubasta=[
    check('fecha_inicio_sub', 'El formato de fecha-hora no es correcto')
    .not()
    .isEmpty()
    .exists()
    .isISO8601(), // Asegura que la fecha esté en formato ISO 8601

 check('fecha_inicio_sub', 'La fecha de inicio debe ser anterior a la fecha de fin')
    .custom((value, { req }) => {
      if (req.body.fecha_fin_sub && new Date(value) >= new Date(req.body.fecha_fin_sub)) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
      }
      return true;
    }),

 check('precio_inicial_sub', 'El precio inicial es requerido y debe ser un número')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que el precio sea un número

 check('precio_final_sub', 'El precio final es requerido y debe ser un número')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que el precio sea un número

 check('unidad_peso_sub', 'La unidad de peso es requerida y debe ser una de las siguientes: Gramo, Libra, Kilogramo, Tonelada')
    .not()
    .isEmpty()
    .exists()
    .isIn(['Gramo', 'Libra', 'Kilogramo', 'Tonelada']), // Verifica que la unidad de peso esté dentro de los valores permitidos

 check('cantidad_sub', 'La cantidad es requerida y debe ser un número')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que la cantidad sea un número

 check('estado_sub', 'El estado es requerido y debe ser uno de los siguientes: abierta, espera, cerrada, proceso')
    .not()
    .isEmpty()
    .exists()
    .isIn(['abierta', 'espera', 'cerrada', 'proceso']), // Verifica que el estado esté dentro de los valores permitidos

 check('descripcion_sub', 'La descripción es requerida')
    .not()
    .isEmpty()
    .exists()
    .isLength({ min: 1, max: 300 }), // Verifica que la descripción tenga una longitud válida

 check('fk_variedad', 'La variedad es requerida')
    .not()
    .isEmpty()
    .exists()
    .isNumeric(), // Verifica que la variedad sea un número
]
