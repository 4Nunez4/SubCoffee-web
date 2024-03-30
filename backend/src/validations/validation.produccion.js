import { check } from "express-validator";

export const valiRegistroProduccion = [
    check("cantidad_pro", "Ingrese la cantidad de la produccion.").isInt(),
    check("fk_id_variedad", "Ingrese la variedad a la produccion.").isInt(),
    check("fk_id_finca", "Ingrese la finca a la produccion.").isInt(),
    check("estado_pro", "estado invalido").isIn('activo','inactivo').not().isEmpty()
]

export const valiActualizacionProduccion = [
    check("cantidad", "Ingrese la cantidad de la produccion.").isInt()
]