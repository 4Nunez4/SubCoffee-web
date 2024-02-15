import {pool} from "../databases/conexion.js"

export const getNotifications = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notificaciones");
        if (result.length >  0) {
            res.status(200).json({status:200, data:result});
        } else {
            res.status(400).json({status:400, message: 'No se encontraron notificaciones' });
        }
    } catch (error) {
        res.status(500).json({ status:500, message: 'Error al obtener las notificaciones mod getNotifications', error });
    }
};

export const getNotification = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM notificaciones WHERE pk_id_not = ?", [req.params.id]);
        if (rows.length > 0) {
            res.status(200).json({status:200, data:rows});
        } else {
            res.status(404).json({status:404, message: 'Error ID Notificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ status:500, message: 'Error al obtener la notificación mod getNotification', error });
    }
};

export const createNotification = async (req, res) => {
    const { tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario } = req.body;
    try {
        const [rows] = await pool.query("INSERT INTO notificaciones (tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario) VALUES (?, ?, ?, ?, ?)", [tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario]);
        if(rows.affectedRows){
            res.status(201).json({ status: 200, message: 'Notificación creada exitosamente', data:rows});
        }else {
            res.status(404).json({status: 404, message: "Error al validar la notificación." });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message:'Error al crear la notificación', error });
    }
};

export const updateNotification = async (req, res) => {
    try {
        const id = req.params.id;
        const { tipo_not, fecha_not, texto_not } = req.body;
        const [result] = await pool.query("UPDATE notificaciones SET tipo_not = ?, fecha_not = ?, texto_not = ? WHERE pk_id_not = ?", [tipo_not, fecha_not, texto_not, id]);
        if(result.affectedRows > 0) {
            res.status(200).json({ status: 200, message: 'Notificación actualizada exitosamente' });
        }else {
            res.status(404).json({status: 404, message: "El ID proporcionado es incorrecto"})
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar la notificación', error});
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM notificaciones WHERE pk_id_not = ?", [req.params.id]);
        if(result.affectedRows === 0){
            res.status(404).json({status: 404, message: 'La notificación con el ID proporcionado no existe'});
        }else {
            res.status(200).json({status: 200, message: 'Notificación eliminada exitosamente' });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error al eliminar la notificación', error });
    }
};