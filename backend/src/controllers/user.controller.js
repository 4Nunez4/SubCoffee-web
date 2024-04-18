import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";
import bcrypt from "bcrypt";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploat = multer({ storage: storage });
export const cargarImagen = uploat.single("img");

export const getUsers = async (req, res) => {
  try {
    let sql = `SELECT * FROM usuarios`;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json({ message: "Los usuarios son: ", data: rows });
    } else {
      res.status(404).json({ message: "No hay usuarios registrados por el momento" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const createUser = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cedula_user, nombre_user, email_user, password_user, telefono_user, fechanacimiento_user, rol_user } = req.body;
    // const bcryptPassword = bcrypt.hashSync(password_user, 12);
    
    let sql = `INSERT INTO usuarios (pk_cedula_user, nombre_user, email_user, password_user, telefono_user, fecha_nacimiento_user, rol_user, estado_user) VALUES ('${cedula_user}', '${nombre_user}','${email_user}','${password_user}', '${telefono_user}', '${fechanacimiento_user}' ,'${rol_user}', 'activo')`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Usuario creado exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { cedula_user, nombre_user, email_user, password_user, descripcion_user, telefono_user, fecha_nacimiento_user, rol_user, estado_user } = req.body;
    const bcryptPassword = bcrypt.hashSync(password_user, 12);
    let img =  req.file.originalname

    let sql = `UPDATE usuarios SET pk_cedula_user = '${cedula_user}', nombre_user = '${nombre_user}', email_user = '${email_user}', password_user = '${bcryptPassword}', descripcion_user = '${descripcion_user}', imagen_user = '${img}', telefono_user = '${telefono_user}', fecha_nacimiento_user = '${fecha_nacimiento_user}', rol_user = '${rol_user}', estado_user = '${estado_user}' WHERE pk_cedula_user = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario actualizado con exito" });
    } else {
      res.status(404).json({ message: "No se pudo actualizar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `SELECT * FROM usuarios WHERE pk_cedula_user = '${id}'`;
    const [user] = await pool.query(sql);
    if (user.length > 0) {
      res.status(200).json({ message: "Usuario encontrado con exito", data: user });
    } else {
      res.status(404).json({ message: "Error al encontrar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `DELETE FROM usuarios WHERE pk_cedula_user = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario eliminado con exito" });
    } else {
      res.status(404).json({ message: "Error con el ID al eliminar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const activarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE usuarios SET estado_user = 1 WHERE pk_cedula_user = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario activado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun usuario con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const desactivarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE usuarios SET estado_user = 2 WHERE pk_cedula_user = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario desactivado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun usuario con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};