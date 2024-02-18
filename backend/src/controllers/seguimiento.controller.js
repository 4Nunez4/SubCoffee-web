import { pool } from "../databases/conexion.js";

export const listarSeguimientos = async(req, res) => {
    try {
        const [ resultado ] = await pool.query("select * from seguimiento")

        if(resultado.length > 0) {
            res.status(200).json(resultado)
        }else{
            res.status(404).json({
                "mensaje": "No se encontraron seguimientos :c"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const postSeguimiento = async (req, res) => {
    try {
        const  { certificacion_seg, puntuacion_seg, fecha_seg, imagen_seg, fk_id_postulacion, fk_id_usuario } = req.body;

        if (!certificacion_seg || !puntuacion_seg || !fecha_seg || !imagen_seg || !fk_id_postulacion || !fk_id_usuario) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione todos los campos necesarios."
            });
        }

        const [resultado] = await pool.query("insert into seguimiento (certificacion_seg, puntuacion_seg, fecha_seg, imagen_seg, fk_id_postulacion, fk_id_usuario) values (?, ?, ?, ?, ?, ?)",
            [certificacion_seg, puntuacion_seg, fecha_seg, imagen_seg, fk_id_postulacion, fk_id_usuario]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Su seguimiento ha sido exitosa"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron seguimientos :c"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
}

export const putSeguimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { certificacion_seg, puntuacion_seg, fecha_seg, imagen_seg, fk_id_postulacion, fk_id_usuario } = req.body;

        if (!certificacion_seg || !puntuacion_seg || !fecha_seg || !imagen_seg || !fk_id_postulacion || !fk_id_usuario) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione todos los campos necesarios."
            });
        }

        const [resultado] = await pool.query("update seguimiento set certificacion_seg=?, puntuacion_seg=?, fecha_seg=?, imagen_seg=?, fk_id_postulacion=?, fk_id_usuario=? where id=?",
            [certificacion_seg, puntuacion_seg, fecha_seg, imagen_seg, fk_id_postulacion, fk_id_usuario, id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El seguimiento ha sido actualizado exitosamente"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró ningun seguimiento con el id proporcionado"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
}

export const getSeguimientoId = async (req, res) => {
    try {
        const seguimientoId = req.params.id;

        if (!seguimientoId) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione un id de seguimiento válido."
            });
        }

        const [resultado] = await pool.query("select * from seguimiento where pk_id_seg = ?", [seguimientoId]);

        if (resultado.length > 0) {
            res.status(200).json({
                "mensaje": "Datos de seguimiento obtenidos correctamente",
                "data": resultado[0]
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró ningun seguimiento con el id consultado."
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
}

export const deleteSeguimiento = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione un id válido."
            });
        }

        const [resultado] = await pool.query("delete from seguimiento where pk_id_seg = ?", [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "seguimiento eliminado exitosamente."
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró una seguimiento con el id proporcionado."
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
};