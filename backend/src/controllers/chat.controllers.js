import multer from "multer";
import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

// para guardar la imagen de el chat en la carpeta public img 
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "public/img");
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

export const Imagen = upload.single('img');

               // constante para crear un chat //
export const createChat = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { mensaje_chat, fk_id_subasta, fk_id_usuario } = req.body;
    const imagen_chat = req.file.filename;
    const [rows] = await pool.query(
      "INSERT INTO chat(mensaje_chat,fk_id_subasta,fk_id_usuario,imagen_chat) VALUES (?,?,?,?)",
      [mensaje_chat, fk_id_subasta, fk_id_usuario,imagen_chat]
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
// constante para listar todos los chats 
export const getChats = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.pk_id_chat, c.mensaje_chat, c.imagen_chat, c.fecha_chat, u.nombre_user FROM chat c INNER JOIN usuarios u ON c.fk_id_usuario = u.pk_cedula_user`
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
// constante para  actualizar un chat 
export const updateChat = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const id = req.params.id;
    const { mensaje_chat } = req.body;
    // Verifica si se ha cargado una nueva imagen
    let imagen_chat = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      "UPDATE chat SET mensaje_chat = COALESCE(?, mensaje_chat), imagen_chat = COALESCE(?,imagen_chat) WHERE pk_id_chat = ?",
      [mensaje_chat,imagen_chat, id]
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
// constante para listar un chat

export const getChat = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT c.mensaje_chat, c.imagen_chat, c.fecha_chat, u.nombre_user FROM chat c INNER JOIN usuarios u ON c.fk_id_usuario = u.pk_cedula_user WHERE pk_id_chat = ?", [
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

// constante para eliminar un chat  
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
