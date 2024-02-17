import {pool} from "../databases/conexion.js"

export const getNotifications = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notificaciones");
        if (result.length >  0) {
            res.status(200).json({status: 200, message:"Notificaciones encontradas con exito."});
        } else {
            res.status(404).json({status: 404, message: 'No se encontraron notificaciones.'});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error al obtener las notificaciones mod getNotifications.'});
    }
};

export const getNotification = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM notificaciones WHERE pk_id_not = ?", [req.params.id]);
        if (rows.length > 0) {
            res.status(200).json({status: 200, message:"Mensaje encontrado con exito."});
        } else {
            res.status(404).json({status: 404, message: 'Error con ID de Notificación, no encontrado.'});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error al obtener la notificación mod getNotification.'});
    }
};

export const createNotification = async (req, res) => {
    const { tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario } = req.body;
    try {
        const [rows] = await pool.query("INSERT INTO notificaciones (tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario) VALUES (?, ?, ?, ?, ?)", [tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario]);
        if(rows.affectedRows){
            res.status(200).json({status: 200, message: 'Notificación creada exitosamente.'});
        }else {
            res.status(404).json({status: 404, message: "Error al crear la notificación."});
        }
    } catch (error) {
        res.status(500).json({status: 500, message:'Error al crear la notificación. mod createNotificacion.'});
    }
};

export const updateNotification = async (req, res) => {
    try {
        const id = req.params.id;
        const { tipo_not, fecha_not, texto_not } = req.body;
        const [result] = await pool.query("UPDATE notificaciones SET tipo_not = COALESCE(?, tipo_not), fecha_not = COALESCE(?, fecha_not), texto_not = COALESCE(?, texto_not) WHERE pk_id_not = ?", [tipo_not, fecha_not, texto_not, id]);
        if(result.affectedRows > 0) {
            res.status(200).json({status: 200, message: 'Notificación actualizada exitosamente.'});
        }else {
            res.status(404).json({status: 404, message: "El ID proporcionado no existe."})
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error al actualizar la notificación. mod updateNotification.'});
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM notificaciones WHERE pk_id_not = ?", [req.params.id]);
        if(result.affectedRows > 0){
            res.status(200).json({status: 200, message: 'Notificación eliminada exitosamente.'});
        }else {
            res.status(404).json({status: 404, message: 'La notificación con el ID proporcionado no existe.'});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error al eliminar la notificación. mod deleteNotification.'});
    }
};