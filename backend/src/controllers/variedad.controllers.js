import {pool} from '../databases/conexion.js';
import { validationResult } from 'express-validator';


export const listarVariedad = async (req,res) =>{
    try {
        let sql = 'select * from variedad'
        const [result] = await pool.query(sql)
        
        if(result.length > 0){
            return res.status(200).json(result)
        }
        else{
            return res.status(404).send({'mesage': 'Error no hay variedades'})
        }
    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
};

export const guardarVariedad= async (req, res) => {
        try{
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json(error)
            }
    
            const {tipo_vari, descripcion_vari, puntuacion_vari, estado_vari} = req.body;
            const [rows] = await pool.query("INSERT INTO variedad(tipo_vari, descripcion_vari, puntuacion_vari,estado_vari) VALUES (?,?,?,?)", [tipo_vari, descripcion_vari, puntuacion_vari ,estado_vari ]);
            if(rows.affectedRows){
                res.status(200).json({status:500, message:"Variedad creada con exito"});
            }else{
                res.status(404).json({status:404, message: "Error al crear la variedad"});
            }
        }catch(e){
                res.status(500).json({status:500, message:"Error Sistema: No se pudo crear la variedad" + e});
        }
}

export const actualizarVariedad = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        const id = req.params.id;
        const { tipo_vari, descripcion_vari, puntuacion_vari, estado_vari } = req.body;
        const [result] = await pool.query("UPDATE variedad SET tipo_vari = ?, descripcion_vari = ?, puntuacion_vari = ?, estado_vari = ? WHERE pk_id_vari - ?", [tipo_vari, descripcion_vari, puntuacion_vari,estado_vari, id]);
        if(result.affectedRows > 0) {
            res.status(200).json({ status: 200, message: 'La variedad ha sido actualizada exitosamente' });
        }else {
            res.status(404).json({status: 404, message: "El ID de la variedad es incorrecto"})
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar la variedad', error});
    }
}

export const buscarvariedad = async (req,res) =>{
    try{
      const [rows] = await pool.query("SELECT * FROM variedad WHERE pk_id_vari = ?", [req.params.id]);
      if(rows.length >0){
        res.status(200).json({status:200, data:rows});
      }else{
        res.status(404).json({status:404, message: 'Error ID variedad no encontrada' });
      }
  
    }catch(e){
      res.status(500).json({ status:500, message: 'Error en el sistema', e });
    }
  };

  export const deleteVariedad = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM variedad WHERE pk_id_vari = ?", [req.params.id]);
        if(result.affectedRows === 0){
            res.status(404).json({status: 404, message: 'La Variedad con el ID proporcionado no existe'});
        }else {
            res.status(200).json({status: 200, message: 'Variedad eliminada exitosamente' });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error en el Sistema', error });
    }
  };

  export const desactivarVariedad = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        const id = req.params.id;
        const { estado_vari } = req.body;
        const [variedaExiste] = await pool.query("UPDATE variedad SET estado_vari = ? WHERE pk_id_vari = ?", [estado_vari, id]);
        if(variedaExiste.length === 0) {
            res.status(404).json({ status: 404, message: 'El id de la variedad es incorrecto'});
        }else {
           const [result] = await pool.query("UPDATE variedad SET estado_vari = ? WHERE pk_id_vari = ?", ['inactivo', id]);
           if(result.affectedRows >0)
           res.status(200).json({status: 200, message: "La variedad fue desactivada exitosamente"})
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al desactivar la variedad', error});
    }
}


export const activarVariedad = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        const id = req.params.id;
        const { estado_vari } = req.body;
        const [variedaExiste] = await pool.query("UPDATE variedad SET estado_vari = ? WHERE pk_id_vari = ?", [estado_vari, id]);
        if(variedaExiste.length === 0) {
            res.status(404).json({ status: 404, message: 'El id de la variedad es incorrecto'});
        }else {
           const [result] = await pool.query("UPDATE variedad SET estado_vari = ? WHERE pk_id_vari = ?", ['activo', id]);
           if(result.affectedRows >0)
           res.status(200).json({status: 200, message: "La variedad fue activada exitosamente"})
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al desactivar la variedad', error});
    }
}