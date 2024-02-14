import {pool} from "../db.js"

export const getNotifications = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM notificaciones WHERE fk_id_usuario = ?", [req.body.fk_id_usuario]);
        if (rows.length >  0) {
            res.status(200).json(rows);
        } else {
            res.status(200).json({ message: 'Por el momento no existen notificaciones' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
};

export const getNotification = async (req, res) => {
    try {
        const { pk_id_not } = req.params; 
        const [rows] = await pool.query("SELECT * FROM notificaciones WHERE pk_id_not = ?", [pk_id_not]);
        if (!rows.length) {
            res.status(404).json({ error: 'Notificación no encontrada' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la notificación' });
    }
};

export const createNotification = async (req, res) => {
    try {
        const { tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario } = req.body;
        await pool.query("INSERT INTO notificaciones (tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario) VALUES (?, ?, ?, ?, ?)", [tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario]);
        res.status(201).json({ message: 'Notificación creada exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la notificación' });
    }
};

export const updateNotification = async (req, res) => {
    try {
        const { pk_id_not } = req.body;
        const { tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario } = req.body;
        const [rows] = await pool.query("UPDATE notificaciones SET tipo_not = ?, fecha_not = ?, texto_not = ?, fk_id_subasta = ?, fk_id_usuario = ? WHERE pk_id_not = ?", [tipo_not, fecha_not, texto_not, fk_id_subasta, fk_id_usuario, pk_id_not]);
        if(rows.affectedRows === 0) {
            return res.status(404).json({message: "El ID proporcionado no es incorrecto"})
        }
        res.status(200).json({ message: 'Notificación actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const [rows] = await pool.query("DELETE FROM notificaciones WHERE pk_id_not = ?", [req.body.pk_id_not]);
        if(rows.affectedRows === 0){
            return res.status(404).json({ error: 'La notificación con el ID proporcionado no existe' });
        }
        res.status(200).json({ message: 'Notificación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la notificación' });
    }
};