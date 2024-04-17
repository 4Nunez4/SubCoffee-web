import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";

export const getVeredas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM veredas");
    if(result.length > 0) {
      res.status(200).json({message: "Veredas encontradas exitosamente",data: result });
    } else {
      res.status(404).json({message: "Error al listar las veredas"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const getVereda = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`SELECT * FROM veredas WHERE pk_id_vere = '${id}'`);
    if (result.length > 0) {
      res.status(200).json({ message: "Vereda encontrada", data: result });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID '${id}'` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const crearVereda = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre_vere, fk_municipio } = req.body;
    const [result] = await pool.query(`INSERT INTO veredas (nombre_vere, fk_municipio, estado_vere) VALUES ('${nombre_vere}', '${fk_municipio}', 'activo')`);
    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Vereda creada exitosamente" });
    }else {
      res.status(400).json({message:"Error al crear la vereda"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const editarVereda = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { nombre_vere, fk_municipio } = req.body;
    const [result] = await pool.query(`UPDATE veredas SET nombre_vere = '${nombre_vere}', fk_municipio = '${fk_municipio}' WHERE pk_id_vere = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda actualizada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const eliminarVereda = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`DELETE FROM veredas WHERE pk_id_vere = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda eliminada correctamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const activarVereda = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE veredas SET estado_vere = 1 WHERE pk_id_vere = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda activada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const desactivarVereda = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE veredas SET estado_vere = 2 WHERE pk_id_vere = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda desactivada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};
