import { check} from "express-validator";

export const validarUsuarioRegister= [
    check('nombre_user','El nombre es obligatorio, maximo 50 caracteres').not().isEmpty().isLength({max:50}),

    check('pk_cedula_user', 'Es obligatorio ingresar numeros').toInt().isNumeric({no_symbols: true}).isLength({max: 11}), 

    check('email_user', 'Correo invalido vuelve a intentarlo').isEmail().isLength({max:100}),

    check('password_user','total de caracteres maximo 60').isLength({max:60}),

    check('descripcion_user', 'total de caracteres maximo 170').isLength({max:170}),

    check('telefono_user','total de caracteres maximo 12').isLength({max:12}),

    check('fecha_nacimiento_user', 'Formato de fecha incorrecta').exists().isISO8601(),

    check('rol_user', 'El rol del usuario es obligatorio, ingrese los roles que son permitidos (vendedor, comprador, admin)').not().isEmpty().custom((value)=>
    {
        const rol = ['vendedor','comprador','admin']
        if(!rol.includes(value)){
            throw new Error("Error, ingrese los roles permitidos")
        }   
        return true
    })
]

export const validarUsuarioActualizacion=[
    check('nombre_user', 'El nombre es obligatorio, maximo 50 caracteres').not().isEmpty().isLength({max:50}),

    check('email_user', 'Correo invalido, vuelve a ingresarlo').isEmail(),
    
    check('password_user','total de caracteres maximo 60').isLength({max:60}),

    check('descripcion_user', 'total de caracteres maximo 170').isLength({max:170}),

    check('telefono_user','total de caracteres maximo 12').isLength({max:12}),

    check('fecha_nacimiento_user', 'Formato de fecha incorrecta').exists().isISO8601(),

    check('rol_user', 'El rol del usuario es obligatorio, ingrese los roles que son permitidos (vendedor, comprador, admin)').isEmpty().custom((value)=>{
        const rol = ['vendedor','comprador','admin']
        if(!rol.includes(value)){
            throw new Error("Error, ingrese los roles permitidos")
        }   return true
    }),
]