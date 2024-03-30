import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";

export const registrarProduccion = async(req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const {cantidad_pro,fk_id_variedad,fk_id_finca,estado_pro} = req.body;
        const [rows]=await pool.query(`insert into produccion(cantidad_pro,fk_id_variedad,fk_id_finca,estado_pro) values (?,?,?,?)`, [cantidad_pro,fk_id_variedad,fk_id_finca,estado_pro]);
        if (rows.affectedRows) {
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
            res.status(404).json({'status': 404,'message': 'No se ha registrado ninguna producción en el sistema.'});
        }
    } catch (error) {
        res.status(500).json({'status':500,'message':'Error: '+error});
    }
}

export const actualizarProduccion = async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        
        const { id } = req.params;
        const {cantidad} = req.body;
        const [result] = await pool.query('update produccion set cantidad_pro = COALESCE(?, cantidad_pro) where pk_id_pro = ?',[cantidad, id]);
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

export const desactivarProduccion = async(req,res) => {
    try {
        const idPro = req.params.id;
        const [result] = await pool.query('update produccion set estado_pro = 2 where pk_id_pro = ?',[idPro]);

        if(result.affectedRows>0) {
            res.status(200).json({'status':200, 'message':`Se desactivo la producción del ID ${idPro}`});
        } else {
            res.status(404).json({'status':404, 'message':`no se encontró la producción del ID ${idPro}`});
        }
    } catch (e) {
        res.status(500).json({'status':500, 'message':'Error: '+e});
    }
}

export const activarProduccion = async(req,res) => {
    try {
        const idPro = req.params.id;
        const [result] = await pool.query('update produccion set estado_pro = 1 where pk_id_pro = ?',[idPro]);

        if(result.affectedRows>0) {
            res.status(200).json({'status':200, 'message':`Se activo la producción del ID ${idPro}`});
        } else {
            res.status(404).json({'status':404, 'message':`no se encontró la producción del ID ${idPro}`});
        }
    } catch (e) {
        res.status(500).json({'status':500, 'message':'Error: '+e});
    }
}