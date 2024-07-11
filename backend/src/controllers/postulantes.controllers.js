import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

export const guardarPostulantes = async (req, res) => {    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const { fk_id_usuario, fk_id_subasta } = req.body;

      const [existingPost] = await pool.query(
        `SELECT pk_id_post, estado_post FROM postulantes WHERE fk_id_usuario = ? AND fk_id_subasta = ?`,
        [fk_id_usuario, fk_id_subasta]
      );
  
      if (existingPost.length > 0) {
        const { pk_id_post, estado_post } = existingPost[0];
        if (estado_post === 'inactivo') {
          const [updateResult] = await pool.query(
            `UPDATE postulantes SET estado_post = 'activo' WHERE pk_id_post = ?`,
            [pk_id_post]
          );
          if (updateResult.affectedRows > 0) {
            res.status(200).json({ message: "Postulante reactivado exitosamente" });
          } else {
            res.status(404).json({ message: "Error al reactivar el postulante" });
          }
        } else {
          res.status(400).json({ message: "El usuario ya está postulado para esta subasta" });
        }
      } else {
        const [insertResult] = await pool.query(
          `INSERT INTO postulantes (fk_id_usuario, fk_id_subasta, estado_post) VALUES (?, ?, 'activo')`,
          [fk_id_usuario, fk_id_subasta]
        );
        if (insertResult.affectedRows > 0) {
          res.status(200).json({ message: "Postulante creado exitosamente" });
        } else {
          res.status(404).json({ message: "Error al crear el postulante" });
        }
      }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const getPostulantes = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      SELECT p.*, u.nombre_user, u.email_user, u.imagen_user
      FROM postulantes p 
      INNER JOIN usuarios u ON p.fk_id_usuario = u.pk_cedula_user 
      INNER JOIN subasta s ON p.fk_id_subasta = s.pk_id_sub 
      WHERE s.pk_id_sub = ?
    `, [req.params.id]
    );

    if (result.length > 0) {
      res.status(200).json({ data:result });
    } else {
      res.status(204).send({ message: "Por el momento no hay postulantes." }); 
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error }); 
  }
};

export const getPostulanteesActivos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
        SELECT p.*, u.nombre_user, u.email_user, u.imagen_user
        FROM postulantes p 
        INNER JOIN usuarios u ON p.fk_id_usuario = u.pk_cedula_user 
        INNER JOIN subasta s ON p.fk_id_subasta = s.pk_id_sub 
        WHERE s.pk_id_sub = ? AND estado_post = 'activo'
      `,
      [req.params.id]
    );
    if (rows.length > 0) {
      res.status(200).json({ data: rows });
    } else {
      res.status(204).json({ message: "Error, postulantes no encontrados para el ID subasta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const deletePostulante = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM postulantes WHERE pk_id_post = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "El postulante con el ID proporcionado no existe",});
    } else {
      res.status(200).json({ message: "Postulante eliminado exitosamente" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const postulacionActiva = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(
      `UPDATE postulantes SET estado_post = 1 WHERE pk_id_post = '${id}'`
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Postulante activado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun postulante con el ID`,});
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const postulacionInactiva = async (req, res) => {
  const { fk_id_usuario, fk_id_subasta } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE postulantes SET estado_post = 'inactivo' WHERE fk_id_usuario = ? AND fk_id_subasta = ?`,
      [fk_id_usuario, fk_id_subasta]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Postulante desactivado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun postulante con el ID` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};
