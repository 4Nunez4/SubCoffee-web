import multer from "multer";
import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/fincas");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploat = multer({ storage: storage });
export const cargarImagen = uploat.single("imagen_fin");

export const getFincas = async (req, res) => {
  try {
    let sql = `
      SELECT f.*, v.nombre_vere 
      FROM finca f
      INNER JOIN veredas v 
      ON f.fk_vereda = v.pk_id_vere
    `;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Las fincas encontradas con exito", data: result });
    } else {
      res.status(404).json({ message: "No se encontraron fincas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getFinca = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = 
    `
      SELECT f.*, v.*, m.*, d.*
      FROM finca f
      INNER JOIN veredas v ON f.fk_vereda = v.pk_id_vere
      INNER JOIN municipio m ON v.fk_municipio = m.pk_codigo_muni
      INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar
      WHERE f.fk_id_usuario = '${id}';
    `;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Finca encontrada", data: result });
    } else {
      res.status(204).json({ message: "No se encontraron fincas para el usuario" });
    }
  } catch (error) {
     res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const createFinca = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre_fin, fk_id_usuario, fk_vereda } = req.body;
    let imagen_fin = req.file.originalname;
    let sql = `INSERT INTO finca(nombre_fin, imagen_fin, estado_fin, fk_id_usuario, fk_vereda) VALUES ('${nombre_fin}', '${imagen_fin}', 'activo', '${fk_id_usuario}', '${fk_vereda}')`;
    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Finca creada con exito" });
    } else {
      res.status(404).json({ message: "No se pudo crear la finca" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updateFinca = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { nombre_fin, fk_vereda } = req.body;
    let imagen_fin = req.file.originalname;
    let sql = `UPDATE finca SET nombre_fin = '${nombre_fin}', imagen_fin = '${imagen_fin}', fk_vereda = '${fk_vereda}' WHERE pk_id_fin = '${id}'`;
    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Finca actualizada con exito" });
    } else {
      res.status(404).json({ message: "No se pudo actualizar la finca con el ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const deleteFinca = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `DELETE FROM finca WHERE pk_id_fin = ${id}`;
    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Finca eliminada con exito" });
    } else {
      res.status(404).json({ message: "Error con el ID al eliminar la finca" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarFinca = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE finca SET estado_fin = 1 WHERE pk_id_fin = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Finca activada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Finca con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const desactivarFinca = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE finca SET estado_fin = 2 WHERE pk_id_fin = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Finca desactivada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Finca con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};
