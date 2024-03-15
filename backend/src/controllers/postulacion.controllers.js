import { pool } from '../databases/conexion.js';
import { validationResult } from 'express-validator';

export const getPostulaciones = async (req,res) =>{
    try {
        let sql = 'select * from postulacion'
        const [result] = await pool.query(sql)
        
        if(result.length > 0){
            return res.status(200).json(result)
        }
        else{
            return res.status(404).send({'mesage': 'Error no hay postulaciones'})
        }
    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
};

export const guardarPostulacion = async (req,res)=> {
    
  try {
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
  const {oferta_pos,fk_id_usuario,	fk_id_subasta , estado_pos } = req.body;

      const [rows] = await pool.query("INSERT INTO postulacion(oferta_pos, fk_id_usuario,	fk_id_subasta , estado_pos) VALUES (?,?,?,?)", [oferta_pos, fk_id_usuario,	fk_id_subasta , estado_pos]);
      if(rows.affectedRows){
          res.status(200).json({status: 200, message: "Se creo con exito la postulacion."});
      } else {
          res.status(404).json({status: 404, message: "Error al crear la postulacion." });
      }
  } catch (error) {
      res.status(500).json({status: 500, message: "Error servidor " + error});
  }
};

export const getPostulacion = async (req,res) =>{
  try{
    const [rows] = await pool.query("SELECT * FROM postulacion WHERE fk_id_usuario = ?", [req.params.id]);
    if(rows.length >0){
      res.status(200).json({status:200, data:rows});
    }else{
      res.status(404).json({status:404, message: 'Error ID postulacion no encontrada' });
    }

  }catch(e){
    res.status(500).json({ status:500, message: 'Error al obtener las postulaciones', e });
  }
};

  export const updatePostulacion = async (req, res) => {
      try {
        const errores  = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json(errores);
        }
        
          const id = req.params.id;
          const {oferta_pos, estado_pos}= req.body;
          const [result] = await pool.query("UPDATE postulacion SET oferta_pos = COALESCE(?, oferta_pos) ,estado_pos = COALESCE(?, estado_pos) WHERE pk_id_pos = ?", [ oferta_pos,estado_pos, id]);
          if(result.affectedRows > 0) {
              res.status(200).json({ status: 200, message: 'Postulacion actualizada exitosamente' });
          }else {
              res.status(404).json({status: 404, message: "El ID de la postulacion es incorrecto"})
          }
      } catch (error) {
          res.status(500).json({ status: 500, message: 'Error en el sistema'+ error});
      }
  }

export const deletePostulacion = async (req, res) => {
   try {
       const [result] = await pool.query("DELETE FROM postulacion WHERE pk_id_pos = ?", [req.params.id]);
       if(result.affectedRows === 0){
           res.status(404).json({status: 404, message: 'La Postulacion con el ID proporcionado no existe'});
       }else {
           res.status(200).json({status: 200, message: 'Postulacion eliminada exitosamente' });
       }
   } catch (error) {
       res.status(500).json({status: 500, message: 'Error al eliminar la postulacion', error });
   }
 };
export const desactivarPostulacion = async (req, res) => {
    try {
        const id = req.params.id;
        const {estado_pos}= req.body;
        const [postulacionExiste] = await pool.query("UPDATE postulacion SET estado_pos = COALESCE(?, estado_pos) WHERE pk_id_pos = ?", [estado_pos, id]);
        if(postulacionExiste.length === 0) {
            res.status(404).json({ status: 404, message: 'El id de la postulacion es incorrecto' });
        }else {
            const [result] = await pool.query("UPDATE postulacion SET estado_pos = ? WHERE pk_id_pos = ?", ["inactivo", id]);
            if(result.affectedRows >0){
                 res.status(200).json({ status: 200, message: 'Postulacion desactivada exitosamente' });
            }
           
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error en el sistema'+ error});
    }
};

export const activarPostulacion = async (req, res) => {
    try {
        const id = req.params.id;
        const {estado_pos}= req.body;
        const [postulacionExiste] = await pool.query("UPDATE postulacion SET estado_pos = COALESCE(?, estado_pos) WHERE pk_id_pos = ?", [estado_pos, id]);
        if(postulacionExiste.length === 0) {
            res.status(404).json({ status: 404, message: 'El id de la postulacion es incorrecto' });
        }else {
            const [result] = await pool.query("UPDATE postulacion SET estado_pos = ? WHERE pk_id_pos = ?", ["activo", id]);
            if(result.affectedRows >0){
                 res.status(200).json({ status: 200, message: 'Postulacion activada exitosamente' });
            }
           
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error en el sistema'+ error});
    }
};