import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";

export const getMunicipios = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM municipio");
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No se encontraron municipios" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error });
  }
};

export const getMunicipioById = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`SELECT * FROM municipio WHERE pk_codigo_muni = '${id}'`);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error });
  }
};

export const createMunicipio = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pk_codigo_muni, nombre_muni, fk_departamento } = req.body;
    const [result] = await pool.query(`INSERT INTO municipio (pk_codigo_muni, nombre_muni, estado_muni, fk_departamento) VALUES ('${pk_codigo_muni}', '${nombre_muni}', 'activo', '${fk_departamento}')`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio creado exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo crear el municipio" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error });
  }
};

export const updateMunicipio = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { pk_codigo_muni, nombre_muni, fk_departamento } = req.body;
    const [result] = await pool.query(`UPDATE municipio SET pk_codigo_muni = ('${pk_codigo_muni}'), nombre_muni = ('${nombre_muni}'), fk_departamento = ('${fk_departamento}') WHERE pk_codigo_muni = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio actualizado exitosamente" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error });
  }
};

export const deleteMunicipio = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`DELETE FROM municipio WHERE pk_codigo_muni = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error });
  }
};

export const activarMunicipio = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE municipio SET estado_muni = 1 WHERE pk_codigo_muni = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio activado exitosamente" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error });
  }
};

export const desactivarMunicipio = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE municipio SET estado_muni = 2 WHERE pk_codigo_muni ='${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio desactivado exitosamente" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error });
  }
};
