import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/variedades");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploat = multer({ storage: storage });
export const cargarImagen = uploat.single("img");

export const getVariedades = async (req, res) => {
  try {
    let sql = 
    `
      SELECT v.*, f.nombre_fin AS nombre_finca, t.nombre_tipo_vari AS nombre_tipo_variedad
      FROM variedad v
      INNER JOIN finca f ON v.fk_finca = f.pk_id_fin
      INNER JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari;
    `;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Variedades encontradas", data: result });
    } else {
      res.status(404).json({ message: "Error al buscar las variedades" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getVariedadUser = async (req, res) => {
  try {
    const id = req.params.id
    let sql = 
    `
      SELECT v.*, t.*, f.*
      FROM usuarios u
      JOIN finca f ON u.pk_cedula_user = f.fk_id_usuario
      JOIN variedad v ON f.pk_id_fin = v.fk_finca
      JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari
      WHERE u.pk_cedula_user = ${id};
    `;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Variedades de usuario encontradas", data: result });
    } else {
      res.status(404).json({ message: "Error al buscar la variedad con el ID del usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const createVariedad = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { descripcion_vari, fk_finca, fk_tipo_variedad} = req.body
    let img =  req.file.originalname
    let sql = `INSERT INTO variedad( descripcion_vari, imagen_vari, estado_vari, fk_finca, fk_tipo_variedad) VALUES ('${descripcion_vari}', '${img}', 'activo', '${fk_finca}', '${fk_tipo_variedad}')`
    const [result] = await pool.query(sql)
    if(result.affectedRows > 0){
        res.status(200).json({message:"Variedad creada con exito"})
    }else {
        res.status(404).json({message:"Error al crear la variedad"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updateVariedad = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id
    const {fk_tipo_variedad, descripcion_vari, fk_finca} = req.body
    let img =  req.file.originalname
    let sql = `UPDATE variedad SET fk_tipo_variedad = '${fk_tipo_variedad}', descripcion_vari='${descripcion_vari}', imagen_vari = '${img}', fk_finca = '${fk_finca}' WHERE pk_id_vari = '${id}'`
    const [result] = await pool.query(sql)
    if(result.affectedRows > 0){
        res.status(200).json({message:"Variedad actualizada con exito"})
    }else {
        res.status(404).json({message:"Error al actualizar la variedad con ese ID"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const deleteVariedad = async (req, res) => {
  try {
    const id = req.params.id
    const [result] = await pool.query(`DELETE FROM variedad WHERE pk_id_vari = '${id}'`)
    if(result.affectedRows > 0){
        res.status(200).json({message:"Variedad eliminada con exito"})
    }else {
        res.status(404).json({message:"Error al eliminar la variedad con ese ID"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarVariedad = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE variedad SET estado_vari = 1 WHERE pk_id_vari = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Variedad activada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Variedad con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const desactivarVariedad = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(
      `UPDATE variedad SET estado_vari = 2 WHERE pk_id_vari = ${id}`
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Variedad desactivada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Variedad con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};