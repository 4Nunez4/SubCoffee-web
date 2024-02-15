import { pool } from "../databases/conexion.js"

//listarUsuariosTodos
export const listar = async (req, res) =>{
    try {
        let sql = 'select * from usuarios'
        const [result] = await pool.query(sql)
        
        if(result.length > 0){
            return res.status(200).json(result)
        }
        else{
            return res.status(484).send({'mesage': 'Error, No hay registros de usuario'})
        }
    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
}

   //registrarUsuarios

   export const registrar = async(req, res)=>{
    try {
        const {pk_cedula_user, nombre_user, email_user, telefono_user, fecha_nacimiento_user, password_user, rol_user, descripcion_user} =req.body
        let sql = `insert into usuarios(pk_cedula_user, nombre_user, email_user, telefono_user, fecha_nacimiento_user, password_user, rol_user, descripcion_user) values (?, ?, ?, ?, ?, ?, ?, ?)`

        const [rows] = await pool.query(sql,[pk_cedula_user, nombre_user, email_user, telefono_user, fecha_nacimiento_user, password_user, rol_user, descripcion_user])

        if(rows.affectedRows > 0)
        {res.status(200).json({'status':200, 'mesage': 'Felicidades, el registro fue un exito'})}
        
        else
        {res.status(400).json({'status':400, 'mesage': 'Error, El registro fue denegado'})} 
    } 

    catch (error) {
        res.status(500).json({'status':500, 'mesage':'ERROR SERVIDOR' + error})
    }
}

//actualizar o editar usuario

export const actualizar = async (req, res) => {
    try {
        let pk_cedula_user = req.params.pk_cedula_user

        const {nombre_user, email_user, telefono_user, password_user} = req.body
        
        let sql=`update usuarios set nombre_user=?, email_user=?, telefono_user=?, password_user=? where pk_cedula_user=${pk_cedula_user}`
        const [rows] = await pool.query(sql, [nombre_user, email_user, telefono_user, password_user])

        if(rows.affectedRows > 0)
            res.status(200).json({'status': 200, 'message': 'Felicidades, La actualizacion del usuario fue un exito'})

        else
        res.status(400).json({'status': 400, 'message': 'Error, La actualizacion fue denegada'})
    } 
    catch (error) 
    {
        res.status(500).json({'status': 500, 'message': 'ERROR SERVIDOR' + error})
    }
}

//buscar usuario

export const buscar = async (req, res) =>{
    try {
        let pk_cedula_user = req.params.pk_cedula_user
        let sql = `select * from usuarios where pk_cedula_user = ${pk_cedula_user}`
        const [result] = await pool.query(sql)
        
        if(result.length > 0)
        {
            return res.status(200).json(result)
        }
        else
        {
            return res.status(484).send({'mesage': 'Error, No se encuentra ningun registro de usuario'})
        }
    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
}

//eliminar usuario

export const eliminar = async (req,res)=>{
    try {
        let pk_cedula_user = req.params.pk_cedula_user
        let sql= `delete from usuarios where pk_cedula_user = ${pk_cedula_user}`
        const [rows] = await pool.query(sql)
        
        if(rows.affectedRows > 0)
        res.status(200).json({'status': 200, 'message': 'Se elimino el usuario exitasamente'})

        else
        res.status(400).json({'status': 400, 'message': 'Error, El usuario no fue eliminado'})

    } catch (error) {
        res.status(500).json({'status': 500, 'message': 'ERROR SERVIDOR' + error})
    }

}