import { check } from "express-validator";

export const validateRegistarFinca = [
check(
    "nombre_fin",
    "El nombre es obligatorio, maximo 50 caracteres"
  )
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
check(
        "ubicacion_fin",
        "ubicacion obligatoria "
      )
        .not()
        .isEmpty()
        .isLength({ max: 100 }),
check(
            "imagen_fin",
            "La imagen es obligatoria"
          )
          .exists()
          .not()
          .isEmpty()
          .custom((value, { req }) => {
              if (value === null || value === undefined) {
                  throw new Error('La imagen no puede ser nula');
              }
      
              if (value === '') {
                  throw new Error('La imagen no puede estar vacía');
              }
      
              if (!isNaN(value)) {
                  throw new Error('La imagen no puede ser un número');
              }
              return true;
          }),
check("descripcion_fin", "Descripción obligatoria"
)
          .not()
          .isEmpty()
          .isLength({ max: 100 }),
check(
                    "municipio_fin",
                    "obligatorio llenar el campo de municipio"
                  )
                    .not()
                    .isEmpty()
                    .isLength({ max: 100 }),  
check(
                        "departamento_fin",
                        "obligatorio llenar el campo del departamento"
                      )
                        .not()
                        .isEmpty()
                        .isLength({ max: 100 }),    
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

export const validateActualizarFinca = [
    check(
        "nombre_fin",
        "El nombre es obligatorio, maximo 50 caracteres"
      )
        .not()
        .isEmpty()
        .isLength({ max: 50 }),
    check(
            "ubicacion_fin",
            "ubicacion obligatoria "
          )
            .not()
            .isEmpty()
            .isLength({ max: 100 }),
    check(
                "imagen_fin",
                "La imagen es obligatoria"
              )
              .exists()
              .not()
              .isEmpty()
              .custom((value, { req }) => {
                  if (value === null || value === undefined) {
                      throw new Error('La imagen no puede ser nula');
                  }
          
                  if (value === '') {
                      throw new Error('La imagen no puede estar vacía');
                  }
          
                  if (!isNaN(value)) {
                      throw new Error('La imagen no puede ser un número');
                  }
                  return true;
              }),
    check("descripcion_fin", 
    "Descripción obligatoria"
    )
              .not()
              .isEmpty()
              .isLength({ max: 100 }),
    check(
                        "municipio_fin",
                        "obligatorio llenar el campo de municipio"
                      )
                        .not()
                        .isEmpty()
                        .isLength({ max: 100 }),  
    check(
                            "departamento_fin",
                            "obligatorio llenar el campo del departamento"
                          )
                            .not()
                            .isEmpty()
                            .isLength({ max: 100 }),    

];