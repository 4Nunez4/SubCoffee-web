import { query } from "express";
import { pool } from "../databases/conexion.js";

export const registrarOferta = async(req,res) => {
    try {
        const {oferta} = req.body;
        let sql = `insert into postulacion(oferta_pos) values (?)`;
        const [rows] = await pool.query(sql,[oferta]);
        if (rows.affectedRows>0) {
            res.status(200).json({'status':200,'message':'Se registro con exito la oferta...!!!'});
        }else{
            res.status(403).json({'status':403,'message':'No se registro la oferta...!!!'});
        }
    } catch (e) {
        res.status(500).json({'status':500,'message':'Error: '+e});
    }
}

export const actualizarOferta = async (req,res) => {
    try {
        const { id } = req.params;
        const {oferta} = req.body;
        const [result] = await pool.query('update postulacion set oferta_pos = ? where pk_id_pos = ?',[oferta, id]);
        if(result.affectedRows > 0) {
            res.status(200).json({'status': 200, 'message': `La postualción (oferta) con ID ${id} fue actualizado correctamente.`});
        }else{
            res.status(404).json({'status': 404, message:`'No se encontro nimgúna postulación (oferta) con ese ID ${id}`});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, message: 'Error del servidor al intentar editar la postulación (oferta).'+e});
    }
}

export const buscarOferta = async (req,res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select * from postulacion where pk_id_pos = ?',[id]);
        if(result.length > 0) {
            res.status(200).json(result[0]);
        }else{
            res.status(404).json({'status': 404, message:`No se encontro nimguna postulación(Oferta) con el ID ${id}`});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, message: 'Error.'+e});
    }
}

export const borrarOferta = async(req,res) => {
    try {
        const idPos = req.params.id;
        const [result] = await pool.query('delete from postulacion where pk_id_pos = ?',[idPos]);

        if(result.affectedRows>0) {
            res.status(200).json({'status':200, 'message':'Se elimino la oferta con exito'});
        } else {
            res.status(404).json({'status':404, 'message':'no se elimino la oferta'});
        }
    } catch (e) {
        res.status(500).json({'status':500, 'message':'Error'+e});
    }
}

export const listarOferta = async(req,res) => {
    try {
        let sql ='select * from postulacion';
        const [result] = await pool.query(sql);
        if(result.length > 0) {
            res.status(200).json(result);
        }
        else{
            res.status(404).json({'status': 404,'message': 'No se a registrado ninguna oferta en el sistema...!!!'});
        }
    } catch (error) {
        res.status(500).json({'status':500,'message':'Error: '+error});
    }
}