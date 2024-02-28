import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

export const getChats = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.mensaje_chat, c.fecha_chat, u.nombre_user FROM chat c INNER JOIN usuarios u ON c.fk_id_usuario = u.pk_cedula_user`
    );
    if (rows.length > 0) {
      res.status(200).json({
        status: 200,
        message: "Mensajes encontrados con exito.",
        data: rows,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "No se encontraron mensajes." });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error en el sistema." });
  }
};

export const getChat = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT c.mensaje_chat, c.fecha_chat, u.nombre_user FROM chat c INNER JOIN usuarios u ON c.fk_id_usuario = u.pk_cedula_user WHERE pk_id_chat = ?", [
      req.params.id,
    ]);
    if (rows.length > 0) {
      res.status(200).json({
        status: 200,
        message: "Mensaje encontrado con exito.",
        data: rows,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Error con ID al encontrar el mensaje.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error en el sistema." });
  }
};

export const createChat = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { mensaje_chat, fk_id_subasta, fk_id_usuario } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO chat(mensaje_chat,fk_id_subasta,fk_id_usuario) VALUES (?,?,?)",
      [mensaje_chat, fk_id_subasta, fk_id_usuario]
    );
    if (rows.affectedRows) {
      res
        .status(200)
        .json({ status: 200, message: "Mensaje creado con éxito." });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Error al crear el mensaje." });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error en el sistema." });
  }
};

export const updateChat = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const id = req.params.id;
    const { mensaje_chat } = req.body;
    const [result] = await pool.query(
      "UPDATE chat SET mensaje_chat = COALESCE(?, mensaje_chat) WHERE pk_id_chat = ?",
      [mensaje_chat, id]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: 200,
        message: "El mensaje ha sido actualizado con éxito.",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "No se encontró el mensaje con el ID especificado.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error en el sistema." });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM chat WHERE pk_id_chat = ?", [
      req.params.id,
    ]);
    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ status: 200, message: "Mensaje eliminado con éxito." });
    } else {
      res.status(404).json({
        status: 404,
        message: "No se encontró el mensaje con el ID especificado.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error en el sistema." });
  }
};
