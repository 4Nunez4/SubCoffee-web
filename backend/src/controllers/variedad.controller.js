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
    let sql = `SELECT * FROM variedad`;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Variedades encontradas", data: result });
    } else {
      res.status(404).json({ message: "Error al buscar las variedades" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const getVariedad = async (req, res) => {
  try {
    const id = req.params.id
    let sql = `SELECT * FROM variedad WHERE pk_id_vari = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Variedades encontradas", data: result });
    } else {
      res.status(404).json({ message: "Error al buscar las variedades" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const createVariedad = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { descripcion_vari, fk_finca, fk_variedad} = req.body
    let img =  req.file.originalname
    let sql = `INSERT INTO variedad( descripcion_vari, imagen_vari, estado_vari, fk_finca, fk_variedad) VALUES ('${descripcion_vari}', '${img}', 'activo', '${fk_finca}', '${fk_variedad}')`
    const [result] = await pool.query(sql)
    if(result.affectedRows > 0){
        res.status(200).json({message:"Variedad creada con exito"})
    }else {
        res.status(404).json({message:"Error al crear la variedad"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const updateVariedad = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id
    const {fk_variedad, descripcion_vari, fk_finca} = req.body
    let img =  req.file.originalname
    let sql = `UPDATE variedad SET fk_variedad = '${fk_variedad}', descripcion_vari='${descripcion_vari}', imagen_vari = '${img}', fk_finca = '${fk_finca}' WHERE pk_id_vari = '${id}'`
    const [result] = await pool.query(sql)
    if(result.affectedRows > 0){
        res.status(200).json({message:"Variedad actualizada con exito"})
    }else {
        res.status(404).json({message:"Error al buscar las variedades"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const deleteVariedad = async (req, res) => {
  try {
    const id = req.params.id
    let sql = `DELETE FROM variedad WHERE pk_id_vari = ${id}`
    const [result] = await pool.query(sql)
    if(result.length > 0){
        res.status(200).json({message:"Variedad eliminada con exito"})
    }else {
        res.status(404).json({message:"Error al eliminar la variedad"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
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
    res.status(500).json({ message: "Error en el sistema", error: error.message });
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
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};