import { pool } from "../databases/conexion.js";

export const listarSubastas = async(req, res) => {
    try {
        const [ resultado ] = await pool.query("select * from subasta")

        if(resultado.length > 0) {
            res.status(200).json(resultado)
        }else{
            res.status(404).json({
                "mensaje": "No se encontraron subastas :c"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": ("error en el sistema")
        })
    }
}

export const postSubasta = async (req, res) => {
    try {
        const  { fecha_inicio_sub, fecha_fin_sub, precio_final_sub, estado_sub, fk_id_produccion, fk_id_postulacion } = req.body;

        if (!fecha_inicio_sub || !fecha_fin_sub || !precio_final_sub || !estado_sub || !fk_id_produccion || !fk_id_postulacion) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione todos los campos necesarios."
            });
        }

        const [resultado] = await pool.query("insert into subasta (fecha_inicio_sub, fecha_fin_sub, precio_final_sub, estado_sub, fk_id_produccion, fk_id_postulacion) values (?, ?, ?, ?, ?, ?)",
            [fecha_inicio_sub, fecha_fin_sub, precio_final_sub, estado_sub, fk_id_produccion, fk_id_postulacion]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Su subasta ha sido exitosa"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron subastas :c"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        })
    }
}

export const putSubasta = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_inicio_sub, fecha_fin_sub, precio_final_sub, estado_sub, fk_id_produccion, fk_id_postulacion } = req.body;

        if (!fecha_inicio_sub || !fecha_fin_sub || !precio_final_sub || !estado_sub || !fk_id_produccion || !fk_id_postulacion) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione todos los campos necesarios."
            });
        }

        const [resultado] = await pool.query("update subasta set fecha_inicio_sub=?, fecha_fin_sub=?, precio_final_sub=?, estado_sub=?, fk_id_produccion=?, fk_id_postulacion=? where id=?",
            [fecha_inicio_sub, fecha_fin_sub, precio_final_sub, estado_sub, fk_id_produccion, fk_id_postulacion, id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "La subasta ha sido actualizada exitosamente"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró ninguna subasta con el id proporcionado"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
}

export const getSubastaId = async (req, res) => {
    try {
        const subastaId = req.params.id;

        if (!subastaId) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione un id de subasta válido."
            });
        }

        const [resultado] = await pool.query("select * from subasta where pk_id_sub = ?", [subastaId]);

        if (resultado.length > 0) {
            res.status(200).json({
                "mensaje": "Datos de subasta obtenidos correctamente",
                "data": resultado[0]
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró ninguna subasta con el id consultado."
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
}

export const deleteSubasta = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                "mensaje": "Por favor, proporcione un id válido."
            });
        }

        const [resultado] = await pool.query("delete from subasta where pk_id_sub = ?", [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Subasta eliminada exitosamente."
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró una subasta con el id proporcionado."
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
};


