import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";

export const getMunicipios = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
        SELECT m.*, d.nombre_depar
        FROM municipio m
        INNER JOIN departamento d 
        ON m.fk_departamento = d.pk_codigo_depar
      `
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No se encontraron municipios" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getMunicipioById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(      
      `
        SELECT m.*, d.*
        FROM municipio m
        INNER JOIN departamento d 
        ON m.fk_departamento = d.pk_codigo_depar
        WHERE m.pk_codigo_muni = '${id}'
      `
    );
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getMuniForDepart = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(      
      `
        SELECT m.*, d.*
        FROM municipio m
        INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar
        WHERE d.pk_codigo_depar = '${id}';
      `
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Departamento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
}

export const getMuniForDepartActivos = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(      
      `
        SELECT m.*, d.*
        FROM municipio m
        INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar
        WHERE d.pk_codigo_depar = '${id}' AND m.estado_muni = 'activo';
      `
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Departamento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
}

export const createMunicipio = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pk_codigo_muni, nombre_muni, fk_departamento } = req.body;

    const [existingCode] = await pool.query('SELECT * FROM municipio WHERE pk_codigo_muni = ?', [pk_codigo_muni]);
    const [existingName] = await pool.query('SELECT * FROM municipio WHERE nombre_muni = ?', [nombre_muni]);
    const [existingDepar] = await pool.query('SELECT * FROM municipio WHERE fk_departamento = ?', [fk_departamento]);

    if (existingName.length > 0 & existingCode.length > 0 & existingDepar.length > 0) {
      return res.status(400).json({ message: "El municipio que quieres registrar ya existe" });
    }

    if (existingCode.length > 0) {
      return res.status(400).json({ message: "El código del municipio ya existe" });
    }

    const [result] = await pool.query(`INSERT INTO municipio (pk_codigo_muni, nombre_muni, estado_muni, fk_departamento) VALUES ('${pk_codigo_muni}', '${nombre_muni}', 'activo', '${fk_departamento}')`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio creado exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo crear el municipio" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
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

    const [existingCode] = await pool.query('SELECT * FROM municipio WHERE pk_codigo_muni = ? AND pk_codigo_muni != ?', [pk_codigo_muni, id]);
    const [existingName] = await pool.query('SELECT * FROM municipio WHERE nombre_muni = ? AND pk_codigo_muni != ?', [nombre_muni, id]);
    const [existingDepar] = await pool.query('SELECT * FROM municipio WHERE fk_departamento = ? AND pk_codigo_muni != ?', [fk_departamento, id]);

    if (existingName.length > 0 && existingCode.length > 0 && existingDepar.length > 0) {
      return res.status(400).json({ message: "El municipio que quieres registrar ya existe" });
    }

    if (existingCode.length > 0) {
      return res.status(400).json({ message: "El código del municipio ya existe" });
    }

    const [result] = await pool.query(`UPDATE municipio SET pk_codigo_muni = ('${pk_codigo_muni}'), nombre_muni = ('${nombre_muni}'), fk_departamento = ('${fk_departamento}') WHERE pk_codigo_muni = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio actualizado exitosamente" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const deleteMunicipio = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`DELETE FROM municipio WHERE pk_codigo_muni = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarMunicipio = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`UPDATE municipio SET estado_muni = 1 WHERE pk_codigo_muni = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio activado exitosamente, ahora este podrá ser utilizado por los usuarios" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const desactivarMunicipio = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`UPDATE municipio SET estado_muni = 2 WHERE pk_codigo_muni ='${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Municipio desactivado exitosamente, ahora este no podrá ser utilizado por los usuarios" });
    } else {
      res.status(404).json({ message: "Municipio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};