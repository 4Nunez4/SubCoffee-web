import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

export const guardarPostulantes = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { fk_id_usuario, fk_id_subasta,estado_post } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO postulantes(fk_id_usuario, fk_id_subasta,estado_post) VALUES (?,?,?)",
      [fk_id_usuario, fk_id_subasta,estado_post]
    );
    if (rows.affectedRows) {
      res
        .status(200)
        .json({
          status: 200,
          message: "Se registro con exito el postulantes.",
        });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Error al registrar el postulantes." });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error servidor " + error });
  }
};
export const getPostulantes = async (req, res) => {
    try {
       let sql = "SELECT p.pk_id_post, p.estado_post, p.fk_id_usuario, p.fk_id_subasta, u.nombre_user FROM postulantes p INNER JOIN usuarios u ON p.fk_id_usuario = u.pk_cedula_user";
       const [result] = await pool.query(sql);
   
       if (result.length > 0) {
         return res.status(200).json(result);
       } else {
         return res.status(404).send({ message: "Error no hay postulantes" }); // Corregido el nombre de la propiedad 'mesage' a 'message'
       }
    } catch (error) {
       res.status(500).json({ status: 500, message: "Error en el servidor " + error }); // Corregido el nombre de la propiedad 'mesage' a 'message'
    }
   };


export const getPostulante = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT p.pk_id_post,p.estado_post, p.fk_id_usuario, p.fk_id_subasta, u.nombre_user FROM postulantes p INNER JOIN usuarios u ON p.fk_id_usuario = u.pk_cedula_user WHERE pk_id_post = ?",
      [req.params.id]
    );
    if (rows.length > 0) {
      res.status(200).json({ status: 200, data: rows });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Error ID postulantes no encontrada" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Error al obtener las postulantes", e });
  }
};

export const deletePostulante = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM postulantes WHERE pk_id_post = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({
          status: 404,
          message: "El postulante con el ID proporcionado no existe",
        });
    } else {
      res
        .status(200)
        .json({ status: 200, message: "Postulante es eliminado exitosamente" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "Error al eliminar la postulacion",
        error,
      });
  }
};
export const postulacionActiva = async (req, res) => {
    const id = req.params.id;
    try {
      const [result] = await pool.query(
        `UPDATE postulantes SET estado_post = 1 WHERE pk_id_post = '${id}'`
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "postulacion Activa " });
      } else {
        res
          .status(404)
          .json({ message: `No se encontró ninguna postulacion con el ID ${id}` });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en el sistema", error: error.message });
    }
  };
  
  export const postulacionInactiva = async (req, res) => {
    const id = req.params.id;
    try {
      const [result] = await pool.query(
        `UPDATE postulantes SET estado_post = 2 WHERE pk_id_post = ${id}`
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "postulacion Inactiva" });
      } else {
        res
          .status(404)
          .json({ message: `No se encontró ninguna postulacion con el ID ${id}` });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en el sistema", error: error.message });
    }
  };