import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

export const registrar = async (req,res)=>{
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(errors);
        }
        const {nombre_fin,ubicacion_fin,imagen_fin,descripcion_fin,municipio_fin,departamento_fin,fk_id_usuario}=req.body;
        const [rows]=await pool.query(`INSERT INTO finca(nombre_fin, ubicacion_fin, imagen_fin, descripcion_fin, municipio_fin,departamento_fin, fk_id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)`, [nombre_fin,ubicacion_fin,imagen_fin,descripcion_fin,municipio_fin,departamento_fin,fk_id_usuario]);
        if(rows.affectedRows){
            res.status(200).json({status:500, message:"Finca registrada con exito"});
        }else{
            res.status(404).json({status:404, message:"Error al registrar la finca"});
        }
    }catch(a){
        res.status(500).json({status:500, message:"Fallo el sistema : "+a})
    }
}
//obtener todos los registros de la tabla fincas
export const listar = async(req,res)=>{
    try{
        let sql = 'select * from finca'
        const[results] = await pool.query(sql)
        if(results.length > 0){
           res.status(200).json(results) 
        }else{
            res.status(404).json({status:404, message: "No hay ninguna finca registrada"})  
        }
    }catch(err){
        res.status(500).json({status:500, message:"algo fallo",err})

    }
}
//actualizar un registro de la tabla finca por su id 
export const actualizar =async(req,res) =>{
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(errors);
        }
        const id = req.params.id;
        const {nombre_fin,ubicacion_fin,imagen_fin,descripcion_fin,municipio_fin,departamento_fin} = req.body;
        const [result]  = await pool.query('update finca set nombre_fin = COALESCE(?,nombre_fin), ubicacion_fin = COALESCE(?,ubicacion_fin), imagen_fin = COALESCE(?,imagen_fin), descripcion_fin = COALESCE(?,descripcion_fin), municipio_fin = COALESCE(?,municipio_fin),departamento_fin = COALESCE(?,departamento_fin) where pk_id_fin = ?',[nombre_fin,ubicacion_fin,imagen_fin,descripcion_fin,municipio_fin,departamento_fin,id]);
        if(result.affectedRows>0){
            res.status(201).json({status:200,message:'Se ha actualizado correctamente'})
        } else{
            res.status(404).json({status:404,message:'No se han realizado cambios'})
        }
    }catch(err){
        res.status(500).json({status:500,message: "Ocurrio un error en el servidor", err})

    }
}

//obtener un registro especifico de la tabla fincas por su id
export const buscar = async(req,res)=>{
    try{
        const [rowa] = await pool.query('SELECT * FROM finca WHERE pk_id_fin = ?',[req.params.id]);
        if(rowa.length > 0){
            res.status(201).json({status:200, data:rowa})
        } else{
            res.status(404).json({status:404,message:'id de finca no encontrado'})
        }
    }catch(err){
        res.status(500).json({status:500,message: "Ocurrio un error en el servidor", err})

    }
}
//eliminar es lo mismo que buscar por id solo que lo borra 
export const borrar = async(req,res)=>{
    try{
        const [result] = await pool.query('DELETE FROM finca where pk_id_fin =?',[req.params.id]);
        if(result.affectedRows === 0){
            res.status(201).json({status:200, message: "finca eliminada de manera exitosa"})
        } else{
            res.status(404).json({status:404,message:'id de finca no encontrado'})
        }
    }catch(err){
        res.status(500).json({status:500,message: "Ocurrio un error en el servidor", err})

    }
}
//desactivar
export const desactivar = async (req, res)=>{
    try {
    
        const {id} = req.params
    
        const [rows] = await pool.query('UPDATE finca SET estado_fin=2 WHERE pk_id_fin = ?',[id])
    
        if(rows.affectedRows > 0)
        res.status(200).json({'status':200, 'message':'Se desativo la finca exitosamente'})
    
        else
        res.status(404).json({'status':404, 'message':'Error, no se pudo desactivar la finca'})
    } catch (error) {
        res.status(500).json({'status':500, 'message':'ERROR SERVIDOR', error})
    }
}

//Activar
export const activar = async (req, res)=>{
    try {
        const {id} = req.params
    
        const [rows] = await pool.query('UPDATE finca SET estado_fin=1 WHERE pk_id_fin = ?',[id])
    
        if(rows.affectedRows > 0)
        res.status(200).json({'status':200, 'message':'Se activo la finca de manera exitosa'})
    
        else
        res.status(404).json({'status':404, 'message':'Error, no se pudo activar la finca'})
    } catch (error) {
        res.status(500).json({'status':500, 'message':'ERROR SERVIDOR', error})
    }
}
