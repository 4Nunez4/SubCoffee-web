import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";

export const getVeredas = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
        SELECT v.*, m.*, d.*
        FROM veredas v
        INNER JOIN municipio m 
        INNER JOIN departamento d
        ON d.pk_codigo_depar = m.fk_departamento
        ON v.fk_municipio = m.pk_codigo_muni
      `
    );
    if(result.length > 0) {
      res.status(200).json({message: "Veredas encontradas exitosamente",data: result });
    } else {
      res.status(404).json({message: "Error al listar las veredas"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getVereda = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(
      `
        SELECT v.*, m.nombre_muni 
        FROM veredas v
        INNER JOIN municipio m
        ON v.fk_municipio = m.pk_codigo_muni
        WHERE v.pk_id_vere = '${id}'
      `
    );
    if (result.length > 0) {
      res.status(200).json({ message: "Vereda encontrada", data: result });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID '${id}'` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getVeredasForMunicipio = async (req, res) => {
  try {
    const id = req.params.id; 
    const [result] = await pool.query(      
      `
        SELECT v.*
        FROM veredas v
        INNER JOIN municipio m 
        ON v.fk_municipio = m.pk_codigo_muni
        WHERE m.pk_codigo_muni = '${id}';
      `
    );
    if (result.length > 0) {
      res.status(200).json(result); 
    } else {
      res.status(404).json({ message: "No se encontraron veredas para este municipio" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
}

export const getVeredasForMunicipioActivas = async (req, res) => {
  try {
    const id = req.params.id; 
    const [result] = await pool.query(      
      `
        SELECT v.*
        FROM veredas v
        INNER JOIN municipio m 
        ON v.fk_municipio = m.pk_codigo_muni
        WHERE m.pk_codigo_muni = '${id}' AND v.estado_ver = 'activo';
      `
    );
    if (result.length > 0) {
      res.status(200).json(result); 
    } else {
      res.status(404).json({ message: "No se encontraron veredas activas para este municipio" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
}

export const crearVereda = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const { nombre_vere, fk_municipio } = req.body;

    const [existingName] = await pool.query('SELECT * FROM veredas WHERE nombre_vere = ?', [nombre_vere]);
    const [existingMuni] = await pool.query('SELECT * FROM veredas WHERE fk_municipio = ?', [fk_municipio]);

    if (existingName.length > 0 && existingMuni.length > 0) {
      return res.status(400).json({ message: "La vereda que quieres registrar ya existe" });
    }

    const [result] = await pool.query(`INSERT INTO veredas (nombre_vere, fk_municipio, estado_vere) VALUES ('${nombre_vere}', '${fk_municipio}', 'activo')`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda creada exitosamente" });
    }else {
      res.status(404).json({message:"Error al crear la vereda"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const editarVereda = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { nombre_vere, fk_municipio } = req.body;

    const [existingName] = await pool.query('SELECT * FROM veredas WHERE nombre_vere = ?  AND pk_id_vere != ?', [nombre_vere, id]);
    const [existingMuni] = await pool.query('SELECT * FROM veredas WHERE fk_municipio = ?  AND pk_id_vere != ?', [fk_municipio, id]);
    
    if (existingName.length > 0 && existingMuni.length > 0) {
      return res.status(400).json({ message: "La vereda que quieres registrar ya existe" });
    }

    const [result] = await pool.query(`UPDATE veredas SET nombre_vere = '${nombre_vere}', fk_municipio = '${fk_municipio}' WHERE pk_id_vere = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda actualizada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const eliminarVereda = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`DELETE FROM veredas WHERE pk_id_vere = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda eliminada correctamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarVereda = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`UPDATE veredas SET estado_vere = 1 WHERE pk_id_vere = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda activada exitosamente, ahora esta podrá ser utilizada por los usuarios" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const desactivarVereda = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`UPDATE veredas SET estado_vere = 2 WHERE pk_id_vere = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Vereda desactivada exitosamente, ahora esta no podrá ser utilizada por los usuarios" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna vereda con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};
