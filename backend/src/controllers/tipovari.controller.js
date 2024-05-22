import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";

export const getTipoVariedades = async (req, res) => {
  try {
    let sql = `SELECT * FROM tipo_variedad`;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Tipos de variedades encontradas", data: result });
    } else {
      res.status(404).json({ message: "Error al buscar los tipos de variedades" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getTipoVariedadesActivas = async (req, res) => {
  try {
    let sql = `SELECT * FROM tipo_variedad WHERE estado_tipo_vari = 'activo'`;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Tipos de variedades encontradas", data: result });
    } else {
      res.status(404).json({ message: "Error al buscar los tipos de variedades" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getTipoVariedad = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `SELECT * FROM tipo_variedad WHERE pk_id_tipo_vari = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json({ message: "Tipo de variedad encontrada", data: result });
    } else {
      res.status(404).json({ message: "Error al buscar el tipo de variedad con ese ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const createTipoVariedad = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre_tipo_vari } = req.body;

    const [existing] = await pool.query('SELECT * FROM tipo_variedad WHERE nombre_tipo_vari = ?', [nombre_tipo_vari]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El tipo de variedad ya existe" });
    }

    let sql = `INSERT INTO tipo_variedad(nombre_tipo_vari, estado_tipo_vari) VALUES ('${nombre_tipo_vari}', 'activo')`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Tipo de variedad creada con exito" });
    } else {
      res.status(404).json({ message: "Error al crear el tipo de variedad" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updateTipoVariedad = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { nombre_tipo_vari } = req.body;

    const [existing] = await pool.query('SELECT * FROM tipo_variedad WHERE nombre_tipo_vari = ? AND pk_id_tipo_vari != ?', [nombre_tipo_vari, id]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El tipo de variedad ya existe" });
    }

    let sql = `UPDATE tipo_variedad SET nombre_tipo_vari = '${nombre_tipo_vari}' WHERE pk_id_tipo_vari = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Tipo de variedad actualizada con exito" });
    } else {
      res.status(404).json({  message: "Error al actualizar el tipo de variedad con ese ID",});
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const deleteTipoVariedad = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM tipo_variedad WHERE pk_id_tipo_vari = ?`;
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Tipo de variedad eliminada con éxito" });
    } else {
      res.status(404).json({ message: "No se encontró el tipo de variedad con ese ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarTipoVariedad = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(
      `UPDATE tipo_variedad SET estado_tipo_vari = 1 WHERE pk_id_tipo_vari = '${id}'`
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Tipo de variedad activada exitosamente, ahora esta podrá ser utilizada por los usuarios" });
    } else {
      res.status(404).json({  message: `No se encontró ningun tipo de variedad con el ID ${id}`,});
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const desactivarTipoVariedad = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`UPDATE tipo_variedad SET estado_tipo_vari = 2 WHERE pk_id_tipo_vari = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Tipo de variedad desactivada exitosamente, ahora esta no podrá ser utilizada por los usuarios" });
    } else {
      res.status(404).json({  message: `No se encontró ningun tipo de variedad con el ID ${id}`,});
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};
