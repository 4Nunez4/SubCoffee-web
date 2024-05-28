import { pool } from "../databases/conexion.js";

export const createCalificacion = async (req, res) => {
  try {
    const { idUsuario, estrellas, opiniones, fk_usuario } = req.body;
    const [rows] = await pool.query(
      `INSERT INTO calificaciones (id_usuario_cali, estrellas_cali, opiniones_cali, fk_usuario) VALUES ('${idUsuario}', '${estrellas}', '${opiniones}', '${fk_usuario}')`
    );
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Calificación creada exitosamente." });
    } else {
      res.status(404).json({ message: "No se pudo crear la calificación." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const getCalificacionUser = async (req, res) => {
  try {
    const {id} = req.params
    const sql = `SELECT * FROM calificaciones WHERE pk_id_cali = '${id}'` 
    const [result] = await pool.query(sql)
    if (result.length > 0) {
      res.status(200).json(result)
    }else {
      res.status(404).json({ message: "No se pudo obtener la calificación." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
}

export const getCalificaciones = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT 
        c.*,
        u.nombre_user,
        u.email_user,
        u.imagen_user,
        COUNT(*) OVER() as total_calificaciones,
        AVG(c.estrellas_cali) OVER() as promedio_calificaciones,
        SUM(CASE WHEN c.estrellas_cali = 5 THEN 1 ELSE 0 END) OVER() as cinco_estrellas,
        SUM(CASE WHEN c.estrellas_cali = 4 THEN 1 ELSE 0 END) OVER() as cuatro_estrellas,
        SUM(CASE WHEN c.estrellas_cali = 3 THEN 1 ELSE 0 END) OVER() as tres_estrellas,
        SUM(CASE WHEN c.estrellas_cali = 2 THEN 1 ELSE 0 END) OVER() as dos_estrellas,
        SUM(CASE WHEN c.estrellas_cali = 1 THEN 1 ELSE 0 END) OVER() as una_estrella
      FROM calificaciones c
      JOIN usuarios u ON c.id_usuario_cali = u.pk_cedula_user
      WHERE c.fk_usuario = ?
      `;
    const [response] = await pool.query(sql, [id]);

    if (response.length === 0) {
      res.status(200).json({ message: "No hay calificaciones disponibles" });
    } else {
      const {
        total_calificaciones,
        promedio_calificaciones,
        cinco_estrellas,
        cuatro_estrellas,
        tres_estrellas,
        dos_estrellas,
        una_estrella,
      } = response[0];
      const result = {
        calificaciones: response,
        stats: {
          total: total_calificaciones,
          promedio: promedio_calificaciones,
          cinco_estrellas,
          cuatro_estrellas,
          tres_estrellas,
          dos_estrellas,
          una_estrella,
        },
      };
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error });
  }
};

export const updateCalificacion = async (req, res) => {
  try {
    const id = req.params.id;
    const { idUsuario, estrellas, opiniones, fk_usuario } = req.body;
    const result = await pool.query(
      "UPDATE calificaciones SET id_usuario_cali = ?, estrellas_cali = ?, opiniones_cali = ?, fk_usuario = ? WHERE pk_id_cali = ? RETURNING *",
      [idUsuario, estrellas, opiniones, fk_usuario, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Calificación no encontrada" });
    }

    res
      .status(200)
      .json({
        message: "Calificación actualizada",
        calificacion: result.rows[0],
      });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};
