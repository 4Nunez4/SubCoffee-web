import {pool} from "../database/conexion.js"

export const getPostulacion = async (req, res) => {
    try {
        const  id = req.params.id
        let sql = `SELECT * FROM postulacion  WHERE pk_id_postulacion='${id}'`
        const [result] = await pool.query(sql)
        if(result.length > 0){
            res.status(200).json({message:"Postulacion encontrada con exito", data:result})
        }else {
            res.status(404).json({message:"Error al encontrar la postulación con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const getPostulaciones = async (req, res) => {
    try {
        let sql = `SELECT * FROM postulacion`
        const [result] = await pool.query(sql)
        if(result.length > 0){
            res.status(200).json({message:"Postulaciones encontradas con exito", data:result})
        }else {
            res.status(404).json({message:"Error al encontrar las postulaciones"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const createPostulacion = async (req, res) => {
    try {
        const {oferta_pos, fk_id_usuario, fk_id_subasta, estado_pos} = req.body
        let sql = `INSERT INTO postulacion(oferta_pos, fk_id_usuario, fk_id_subasta, estado_pos) VALUES ('${oferta_pos}', '${fk_id_usuario}', '${fk_id_subasta}', '${estado_pos}')`
        const [result] = await pool.query(sql)
        if(result.affectedRows > 0){
            res.status(200).json({message:"Postulacion creada con exito", data:result})
        }else {
            res.status(404).json({message:"Error al crear la postulación"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const updatePostulacion = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `UPDATE postulacion SET oferta_pos = COALESCE('{oferta_pos}',), estado_pos = COALESCE('{estado_pos}' WHERE pk_id_pos = '${id}')`
        const result = await pool.query(sql)
        if(result.affectedRows > 0){
            res.status(200).json({message:"Postulacion actualizada con exito", data:result})
        }else {
            res.status(404).json({message:"No se pudo actualizar la notificacion con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const deletePostulacion = async (req, res) => {
    try {
        const id = req.params
        let sql = `DELETE FROM postulacion WHERE pk_id_pos = '${id}'`
        const result = await pool.query(sql)
        if(result.affectedRows > 0){
            res.status(200).json({message:"Postulacion eliminada con exito"})
        }else {
            res.status(404).json({message:"Error al eliminar la postulación"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}
