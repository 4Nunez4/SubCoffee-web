import { check} from "express-validator";

export const validarUsuarioRegister = [
    check('nombre_user','El nombre es obligatorio, ingrese maximo 50 caracteres').not().isEmpty().isLength({max:50}),

    check('pk_cedula_user', 'Campo vacio vuelve a ingresar su identificacion en caracteres numericos').toInt().isNumeric({no_symbols: true}).isLength({max: 11}), 

    check('email_user', 'Correo invalido vuelve a intentarlo').isEmail().isLength({max:100}),

    check('password_user','Se pueden ingresar maximo 60 caracteres, vuelve a intentarlo').isLength({max:60}),

    check('descripcion_user', 'Se pueden ingresar maximo 170caracteres, vuelve a intentarlo').isLength({max:170}),

    check('telefono_user','Se pueden ingresar maximo 12 caracteres en forma numerica, vuelve a intentarlo').isLength({max:12}),

    check('fecha_nacimiento_user','La fecha de nacimiento es obligatoria').not().isEmpty(),

    check('rol_user','El rol del usuario es obligatorio, ingrese los roles que son permitidos (vendedor,comprador,admin)').exists().isIn(['vendedor','comprador','admin']),

    check('estado_user', 'Estado de ususario es obligatorio, El estado permitido son (Activo, Inactivo)').exists().isIn(['Activo','Inactivo']),

]

export const validarUsuarioActualizar = [
    check('nombre_user','El nombre es obligatorio, ingrese maximo 50 caracteres').not().isEmpty().isLength({max:50}),

    check('email_user', 'Correo invalido vuelve a intentarlo').isEmail().isLength({max:100}),

    check('password_user','Se pueden ingresar maximo 60 caracteres, vuelve a intentarlo').isLength({max:60}),

    check('descripcion_user', 'Se pueden ingresar maximo 170caracteres, vuelve a intentarlo').isLength({max:170}),

    check('telefono_user','Se pueden ingresar maximo 12 caracteres en forma numerica, vuelve a intentarlo').isLength({max:12}),

    check('fecha_nacimiento_user','La fecha de nacimiento es obligatoria').not().isEmpty(),

    check('rol_user','El rol del usuario es obligatorio, ingrese los roles que son permitidos (vendedor,comprador,admin)').exists().isIn(['vendedor','comprador','admin']),

]

