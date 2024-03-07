import { pool } from "../databases/conexion.js"
import { validationResult } from "express-validator"

//listarUsuariosTodos
export const listar = async (req, res) =>{

    try {
        let sql = 'select * from usuarios'
        const [result] = await pool.query(sql)
        
        if(result.length > 0)
        {
            return res.status(200).json(result)
        }

        else{return res.status(404).send({'mesage': 'Error, No hay registros de usuario'})}

    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
}

   //registrarUsuarios

   export const registrar = async (req, res) =>{
    try {
    
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }

        const {pk_cedula_user, nombre_user, email_user, password_user, descripcion_user, telefono_user, rol_user}=req.body

        let sql = `insert into usuarios (pk_cedula_user, nombre_user, email_user, password_user, descripcion_user, telefono_user,  rol_user) values (?,?,?,?,?,?,?)`

        const [rows] = await pool.query(sql,[pk_cedula_user, nombre_user, email_user, password_user, descripcion_user, telefono_user,  rol_user])

        if(rows.affectedRows > 0)
        {
            res.status(200).json({'status':200, 'mesage':'Felicidades, el registro fue un exito'})
        }

        else{res.status(404).json({'status':404, 'mesage': 'Error, el registro fue denegado'})}

    } catch (error) {
        res.status(500).json({'status':500, 'mesage':'ERROR SERVIDOR'})
    }
}

//actualizar o editar usuario

export const actualizar = async (req, res) => {
    try {
 
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }

        const id = req.params.id;

        const {nombre_user, email_user, password_user, descripcion_user, telefono_user, rol_user} = req.body;

        const [result] = await pool.query( 'update usuarios set nombre_user = COALESCE(?,nombre_user), email_user = COALESCE(?, email_user), password_user = COALESCE(?, password_user), descripcion_user = COALESCE(?,descripcion_user), telefono_user = COALESCE(?, telefono_user), rol_user = COALESCE(?, rol_user) where pk_cedula_user = ?', [nombre_user, email_user, password_user, descripcion_user, telefono_user, rol_user, id]);

        if(result.affectedRows>0)
        {
           res.status(200).json({status: 200, message: 'Felicidades, La actualizacion del usuario fue un exito'}) 
        }
        else{res.status(404).json({status: 404, message: 'Error, La actualizacion fue denegada'})}
        
    } catch (error){
        res.status(500).json({status: 500, message: 'ERROR SERVIDOR' + error})
    }
}

//buscar usuario

export const buscar = async (req, res) =>{
    try {
        const [result] = await pool.query(`select * from usuarios where pk_cedula_user = ?`,[req.params.id])

        if(result.length>0)
        {
            return res.status(200).json(result)
        }
        
        else{return res.status(404).send({'mesage': 'Error, No se encuentra ningun registro de usuario'})}

    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
}

//eliminar usuario

export const eliminar = async (req,res)=>{
    try {
   
        const [rows] = await pool.query(`delete from usuarios where pk_cedula_user = ?`,[req.params.id])

        if(rows.affectedRows > 0)
        res.status(200).json({'status': 200, 'message': 'Se elimino el usuario exitasamente'})

        else
        res.status(404).json({'status': 404, 'message': 'Error, El usuario no fue eliminado'})

    } catch (error) {
        res.status(500).json({'status': 500, 'message': 'ERROR SERVIDOR' + error})
    }

}

//desactivar
export const desactivar = async (req, res)=>{
    try {
    
        const {id} = req.params
    
        const [rows] = await pool.query('UPDATE usuarios SET estado_user=2 WHERE pk_cedula_user = ?',[id])
    
        if(rows.affectedRows > 0)
        res.status(200).json({'status':200, 'message':'Se desativo el usuario exitosamente'})
    
        else
        res.status(404).json({'status':404, 'message':'Error, no se pudo desactivar el usuario'})
    } catch (error) {
        res.status(500).json({'status':500, 'message':'ERROR SERVIDOR', error})
    }
}

//Activar
export const activar = async (req, res)=>{
    try {
        const {id} = req.params
    
        const [rows] = await pool.query('UPDATE usuarios SET estado_user=1 WHERE pk_cedula_user = ?',[id])
    
        if(rows.affectedRows > 0)
        res.status(200).json({'status':200, 'message':'Se activo el usuario exitosamente'})
    
        else
        res.status(404).json({'status':404, 'message':'Error, no se pudo activar el usuario'})
    } catch (error) {
        res.status(500).json({'status':500, 'message':'ERROR SERVIDOR', error})
    }
}
