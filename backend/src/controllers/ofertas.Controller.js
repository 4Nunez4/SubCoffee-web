import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

export const guardarOfertas = async (req, res) => {
 try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { oferta_ofer, fk_id_usuario, fk_id_subasta } = req.body;    
    const [rows] = await pool.query("INSERT INTO ofertas(oferta_ofer,fk_id_usuario,fk_id_subasta) VALUES (?,?,?)",[oferta_ofer, fk_id_usuario, fk_id_subasta] );
    if (rows.affectedRows) {
      res.status(200).json({ message: "Se creo con exito la oferta." });
    } else {
      res.status(404).json({ message: "Error al crear la oferta." });
    }
 } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
 }
};
   
export const listarOfertas = async (req, res) => {
  try {
    let sql = "SELECT o.pk_id_ofer, o.oferta_ofer, o.fk_id_subasta, o.fecha_ofer,o.fk_id_usuario, u.nombre_user u.email_user u.telefono_user FROM ofertas o INNER JOIN usuarios u ON o.fk_id_usuario = u.pk_cedula_user";
    const [result] = await pool.query(sql);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).send({ mesage: "No hay ofertas creadas por el momento" });
    }
  } catch (error) {
    res.status(500).json({ mesage: "Error en el servidor " + error });
  }
};

export const atualizarOfertas = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json(errores);
    }

    const id = req.params.id;
    const { oferta_ofer, } = req.body;
    const [result] = await pool.query(
      "UPDATE ofertas SET oferta_ofer = COALESCE(?, oferta_ofer) WHERE pk_id_ofer = ?",
      [oferta_ofer, id]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "oferta actualizada exitosamente" });
    } else {
      res.status(404).json({ message: "El ID de la oferta es incorrecto" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const buscarOferta = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      `
        SELECT o.*, u.pk_cedula_user, u.nombre_user, u.imagen_user, u.telefono_user, u.email_user
        FROM ofertas o
        INNER JOIN usuarios u ON o.fk_id_usuario = u.pk_cedula_user
        WHERE o.fk_id_subasta = '${id}'
      `,
    );
    if (rows.length > 0) {
      res.status(200).json({ data: rows });
    } else {
      res.status(204).json({ message: "Error ID de oferta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const buscarOfertaMayor = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      `
        SELECT o.*, u.pk_cedula_user, u.nombre_user, u.imagen_user, u.telefono_user, u.email_user
        FROM ofertas o
        INNER JOIN usuarios u ON o.fk_id_usuario = u.pk_cedula_user
        WHERE o.fk_id_subasta = '${id}'
        ORDER BY o.oferta_ofer DESC
        LIMIT 1
      `
    );
    if (rows.length > 0) {
      res.status(200).json({ data: rows[0] });
    } else {
      res.status(204).json({ message: "No se encontraron ofertas para esta subasta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const eliminarOferta = async (req, res) => {
  try {
    const {id, user} = req.params

    const [result] = await pool.query("DELETE FROM ofertas WHERE fk_id_subasta = ? AND fk_id_usuario = ?", [
      id, user
    ]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "oferta eliminada con éxito." });
    } else {
      res.status(404).json({ message: "No se encontró la oferta con el ID especificado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

