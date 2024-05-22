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
export const cargarImagen = uploat.single("imagen_user");

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

    const { pk_cedula_user, nombre_user, email_user, password_user, descripcion_user, telefono_user, rol_user } = req.body;
    const bcryptPassword = bcrypt.hashSync(password_user, 12);
    
    let sql = `INSERT INTO usuarios (pk_cedula_user, nombre_user, email_user, password_user, descripcion_user, telefono_user, rol_user, estado_user) VALUES ('${pk_cedula_user}', '${nombre_user}','${email_user}','${bcryptPassword}', '${descripcion_user}', '${telefono_user}', '${rol_user}', 'activo')`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Usuario creado exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const createImagenUser = async (req, res) => {
  try {
    let imagen_user =  req.file.originalname
    
    let sql = `INSERT INTO usuarios (imagen_user) VALUES ('${imagen_user}')`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Imagen de usuario agregada exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo crear la imagen del usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updateUser = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { pk_cedula_user, nombre_user, email_user, descripcion_user, telefono_user, rol_user } = req.body;

    let sql = `UPDATE usuarios SET pk_cedula_user = '${pk_cedula_user}', nombre_user = '${nombre_user}', email_user = '${email_user}', descripcion_user = '${descripcion_user}', telefono_user = '${telefono_user}', rol_user = '${rol_user}' WHERE pk_cedula_user = '${id}'`;
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
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updatePasswordUser = async (req, res) => {
  try {
    const id = req.params.id
    const { oldPassword, newPassword, confirmPassword } = req.body

    const [rows] = await pool.query(`SELECT * FROM usuarios WHERE pk_cedula_user = '${id}'`);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(oldPassword, user.password_user);
    if (!validPassword) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }
    if(newPassword !== confirmPassword){
      res.status(404).json({ message: "La nueva contraseña no coincide con la de confirmar contraseña" });
    }
    const bcryptPassword = bcrypt.hashSync(newPassword, 12);

    let sql = `UPDATE usuarios SET password_user = '${bcryptPassword}' WHERE pk_cedula_user = '${id}'`
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Se registro la nueva contraseña con exito" });
    } else {
      res.status(404).json({ message: "Error con el ID del usuario al cambiar la contraseña" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
}

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
    res.status(500).json({ message: "Error en el servidor" + error });
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
    res.status(500).json({ message: "Error en el servidor" + error });
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
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

