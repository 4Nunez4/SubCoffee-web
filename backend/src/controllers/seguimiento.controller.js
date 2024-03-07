import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

export const listar = async(req, res) => {
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
        const  { nombre_seg, imagen_seg, fk_id_produccion, fk_id_usuario, estado_seg } = req.body;

//        if (!nombre_seg.trim() || !fecha_seg.trim() || !fk_id_produccion || !fk_id_usuario) {
//            return res.status(400).json({
//                "mensaje": "Por favor, proporcione todos los campos necesarios."
//            });
//        }

    const [resultado] = await pool.query("insert into seguimiento (nombre_seg, imagen_seg, fk_id_produccion, fk_id_usuario, estado_seg) values (?, ?, ?, ?, ?)",
            [nombre_seg, imagen_seg, fk_id_produccion, fk_id_usuario, estado_seg]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Su seguimiento ha sido exitoso"
            });
        } else {
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
        const id = req.params.id;
        const { nombre_seg, fecha_seg, imagen_seg, estado_seg} = req.body;

//        if (!nombre_seg.trim() || !fecha_seg.trim() || !fk_id_produccion || !fk_id_usuario) {
//            return res.status(400).json({
//                "mensaje": "Por favor, proporcione todos los campos necesarios."
//            });
//        }

        const [resultado] = await pool.query("update seguimiento set nombre_seg=COALESCE(?, nombre_seg), fecha_seg=COALESCE(?, fecha_seg), imagen_seg=COALESCE(?, imagen_seg), estado_seg=COALESCE(?, estado_seg) where pk_id_seg=?",
            [nombre_seg, fecha_seg, imagen_seg, estado_seg, id]);

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
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
}

export const buscar = async (req, res) => {
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
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
}

export const eliminar = async (req, res) => {
    try {
        const { id } = req.params;


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
        console.error("Error en el bloque try:", error);
        res.status(500).json({
            "mensaje": "Error interno del servidor"
        });
    }
};

export const desactivar = async (req, res)=>{
    try {
    
        const {id} = req.params
    
        const [rows] = await pool.query('UPDATE seguimiento SET estado_seg=2 WHERE pk_id_seg = ?',[id])
    
        if(rows.affectedRows > 0)
        res.status(200).json({'status':200, 'message':'Se desativo el seguimiento exitosamente'})
    
        else
        res.status(404).json({'status':404, 'message':'Error, no se pudo desactivar el seguimiento'})
    } catch (error) {
        res.status(500).json({'status':500, 'message':'ERROR SERVIDOR', error})
    }
}

//Activar
export const activar = async (req, res)=>{
    try {
        const {id} = req.params
    
        const [rows] = await pool.query('UPDATE seguimiento SET estado_seg=1 WHERE pk_id_seg = ?',[id])
    
        if(rows.affectedRows > 0)
        res.status(200).json({'status':200, 'message':'Se activo el seguimiento de manera exitosa'})
    
        else
        res.status(404).json({'status':404, 'message':'Error, no se pudo activar el seguimiento'})
    } catch (error) {
        res.status(500).json({'status':500, 'message':'ERROR SERVIDOR', error})
    }
}
