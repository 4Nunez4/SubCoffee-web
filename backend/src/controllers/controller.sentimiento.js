import { pool } from "../databases/conexion.js";

export const registrarSentimiento = async (req, res) => {
    try {
        const {sentimiento} = req.body;
        const sql = `insert into interacciones(sentimiento) values (?)`;
        const [rows] = await pool.query(sql,[sentimiento]);
        if (rows.affectedRows>0) {
            res.status(200).json({'status': 200, 'message': 'Se registro el sentimiento con exito.'});
        } else {
            res.status(404).json({'status': 404,'message': 'Error al registrar el sentimiento.'});
        }
    } catch (e) {
        res.status(500).json({'status': 500, 'message': 'Error del sistema '+e});
    }
}

export const actualizarSentimiento = async (req, res) => {
    try {
        const {id} = req.params;
        const {sentimiento} = req.body;
        const sql = `update interacciones set sentimiento = ? where ID_inter = ?`;
        const [rows] = await pool.query(sql,[sentimiento,id]);
        if (rows.affectedRows>0) {
            res.status(200).json({'status': 200, 'message': `Se actualizo el sentimiento con el ID ${id}.`});
        } else {
            res.status(404).json({'status': 404,'message': `No se encontro ningún dato por el ID ${id}.`});
        }
    } catch (e) {
        res.status(500).json({'status': 500, 'message': 'Error del sistema '+e});
    }
}

export const buscarSentimiento = async (req, res) => {
    try {
        const {id} = req.params;
        const sql = `select * from interacciones where ID_inter = ?`;
        const [rows] = await pool.query(sql,[id]);
        if (rows.length>0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({'status': 404,'message': `No se encontro ningún dato por el ID ${id}.`});
        }
    } catch (e) {
        res.status(500).json({'status': 500, 'message': 'Error del sistema '+e});
    }
}

export const borrarSentimiento = async (req, res) => {
    try {
        const {id} = req.params;
        const sql = `delete from interacciones where ID_inter = ?`;
        const [rows] = await pool.query(sql,[id]);
        if (rows.affectedRows>0) {
            res.status(200).json({'setatus': 200, 'message': `Se elemino el sentimien del ID ${id}.`});
        } else {
            res.status(404).json({'status': 404,'message': `No se encontro ningún dato por el ID ${id}.`});
        }
    } catch (e) {
        res.status(500).json({'status': 500, 'message': 'Error del sistema '+e});
    }
}

export const listarSentimiento = async (req,res) => {
    try {
        const [rows] = await pool.query(`select * from interacciones`);
        if (rows.length>0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({'status': 404,'message': 'No hay sentimientos guardados.'});
        }
    } catch (e) {
        res.status(500).json({'status': 500, 'message': 'Error del sistema'+e});
    }
}