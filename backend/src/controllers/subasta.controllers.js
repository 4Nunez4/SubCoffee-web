import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

export const listar = async(req, res) => {
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
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
}

export const registrar = async (req, res) => {
    try {
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const  { fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, estado_sub, fk_id_produccion } = req.body;        ;

        // if (!fecha_inicio_sub.trim() || !fecha_fin_sub.trim() || !precio_inicial_sub || !precio_final_sub || !estado_sub.trim() || !fk_id_produccion || !) {
        //     return res.status(400).json({
        //         "mensaje": "Por favor, proporcione todos los campos necesarios."
        //     });
        // }
        

        const [resultado] = await pool.query("insert into subasta (fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, estado_sub, fk_id_produccion) values (?, ?, ?, ?, ?, ?)",
            [fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, estado_sub, fk_id_produccion]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Su subasta ha sido exitosa"
            });
        } 
        

    } catch (error) {
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
}

export const actualizar = async (req, res) => {
    try {
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, estado_sub } = req.body;

//        if (!fecha_inicio_sub.trim() || !fecha_fin_sub.trim() || !precio_inicial_sub || !precio_final_sub || !estado_sub.trim() || !fk_id_produccion || !) {
//           return res.status(400).json({
//               "mensaje": "Por favor, proporcione todos los campos necesarios."
//           });
//       }

        const [resultado] = await pool.query("update subasta set fecha_inicio_sub=COALESCE(?, fecha_inicio_sub), fecha_fin_sub=COALESCE(?, fecha_fin_sub), precio_inicial_sub=COALESCE(?, precio_inicial_sub), precio_final_sub=COALESCE(?, precio_final_sub), estado_sub=COALESCE(?, estado_sub) where pk_id_sub=?",
            [fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, estado_sub, id]);

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
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
}

export const buscar = async (req, res) => {
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
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
}

export const eliminar = async (req, res) => {
    try {
        const id = req.params.id;

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
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
};


