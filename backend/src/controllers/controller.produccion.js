import { query } from "express";
import { pool } from "../databases/conexion.js";

export const registrarProduccion = async(req,res) => {
    try {
        const {cantidad,variedad,finca} = req.body;
        let sql = `insert into produccion(cantidad_pro,fk_id_variedad,fk_id_finca) values (?,?,?)`;
        const [rows] = await pool.query(sql,[cantidad,variedad,finca]);
        if (rows.affectedRows>0) {
            res.status(200).json({'status':200,'message':'Se registro con exito la producción.'});
        }else{
            res.status(403).json({'status':403,'message':'No se registro la producción.'});
        }
    } catch (e) {
        res.status(500).json({'status':500,'message':'Error: '+e});
    }
}

export const listarProduccion = async(req,res) => {
    try {
        let sql ='select * from produccion';
        const [result] = await pool.query(sql);
        if(result.length > 0) {
            res.status(200).json(result);
        }
        else{
            res.status(404).json({'status': 404,'message': 'No se a registrado ninguna producción en el sistema.'});
        }
    } catch (error) {
        res.status(500).json({'status':500,'message':'Error: '+error});
    }
}

export const actualizarProduccion = async (req,res) => {
    try {
        const { id } = req.params;
        const {cantidad} = req.body;
        const [result] = await pool.query('update produccion set cantidad_pro = ? where pk_id_pro = ?',[cantidad, id]);
        if(result.affectedRows > 0) {
            res.status(200).json({'status': 200, 'message': `La producción con ID ${id} fue actualizado correctamente.`});
        }else{
            res.status(404).json({'status': 404, message:`No se encontro nimgúna producción con ese ID ${id}.`});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, message: 'Error: '+e});
    }
}

export const buscarProduccion = async (req,res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select * from produccion where pk_id_pro = ?',[id]);
        if(result.length > 0) {
            res.status(200).json(result[0]);
        }else{
            res.status(404).json({'status': 404, message:`No se encontró ninguna producción con el ID ${id}`});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, message: 'Error.'+e});
    }
}

export const borrarProduccion = async(req,res) => {
    try {
        const idPro = req.params.id;
        const [result] = await pool.query('delete from produccion where pk_id_pro = ?',[idPro]);

        if(result.affectedRows>0) {
            res.status(200).json({'status':200, 'message':`Se elimino la producción del ID ${idPro}`});
        } else {
            res.status(404).json({'status':404, 'message':`no se elimino la producción del ID ${idPro}`});
        }
    } catch (e) {
        res.status(500).json({'status':500, 'message':'Error: '+e});
    }
}