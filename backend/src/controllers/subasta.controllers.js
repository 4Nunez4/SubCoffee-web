import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function(req,img,cb){
            cb(null, "public/img")
        },

        filename: function(req,img,cb){
            cb(null,img.originalname)
        }
    }
)
const upload = multer({storage:storage})
export const cargarImagen= upload.single('img')


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
        //VALIDACION DE ERRORES DE LOS DATOS DE LA SUBASTA
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const  {pk_id_sub, fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, unidad_peso_sub, cantidad, estado_sub, certificado_sub, fk_variedad } = req.body;

        let imagen_sub = req.file.originalname
        /* let certificado_sub = req.file.originalname */

        const [resultado] = await pool.query("INSERT INTO subasta (pk_id_sub, fecha_inicio_sub, fecha_fin_sub, imagen_sub, precio_inicial_sub, precio_final_sub, unidad_peso_sub, cantidad, estado_sub, certificado_sub, fk_variedad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [pk_id_sub, fecha_inicio_sub, fecha_fin_sub, imagen_sub, precio_inicial_sub, precio_final_sub, unidad_peso_sub, cantidad, estado_sub, certificado_sub, fk_variedad]);

        if (resultado.affectedRows > 0)
        {
            res.status(200).json({"mensaje": "Su subasta ha sido exitosa"});
        }
        else 
        {
            res.status(404).json({"mensaje": "No se encontró ninguna subasta con el id proporcionado"});
        }

    } catch (error) {
        console.error("Error en el bloque try:", error);
        res.status(500).json({"mensaje": "Error interno del servidor"});
    }
}


export const actualizarSubasta = async (req, res) => {
    try {
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub,unidad_peso_sub,cantidad, estado_sub,	certificado_sub,fk_variedad } = req.body;
        let imagen_vari = req.file.originalname

        const [resultado] = await pool.query("update subasta set fecha_inicio_sub=?, fecha_fin_sub=?,precio_inicial_sub=?, precio_inicial_sub=?,precio_final_sub=?, unidad_peso_sub=?,cantidad=?, estado_sub=?,	certificado_sub=?, fk_variedad=?, imagen_vari=? WHERE pk_id_sub=?",
            [fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, estado_sub,unidad_peso_sub,cantidad,certificado_sub,fk_variedad, imagen_vari, id]);

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
export const desactivarSubasta = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const id = req.params.id;

        const [subastaExiste] = await pool.query("SELECT estado_sub FROM subasta WHERE pk_id_sub = ?", [id]);
        
        if (subastaExiste.length === 0) {
            return res.status(404).json({ status: 404, message: 'El id de la subasta es incorrecto' });
        } else if (subastaExiste[0].estado_sub === 'cerrada') {
            return res.status(400).json({ status: 400, message: 'La subasta ya está inactiva' });
        }

        const [resultado] = await pool.query("UPDATE subasta SET estado_sub = ? WHERE pk_id_sub = ?", ['cerrada', id]);
        
        if (resultado.affectedRows > 0) {
            res.status(200).json({ status: 200, message: "La subasta ha sido desactivada exitosamente" });
        } else {
            res.status(500).json({ status: 500, message: "Error al actualizar la subasta" });
        }
    } catch (error) {
        console.error("Error en el bloque try:", error);
        res.status(500).json({ status: 500, message: 'Error interno del servidor al desactivar la subasta', error });
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


