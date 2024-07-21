import multer from "multer";
import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/subastas");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const subastaFiles = upload.fields([
  { name: "imagen_sub", maxCount: 1 },
  { name: "certificado_sub", maxCount: 1 },
]);

export const registrar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, descripcion_sub, fk_variedad } = req.body;

    let imagen_sub = req.files && req.files["imagen_sub"] ? req.files["imagen_sub"][0].originalname : null;
    let certificado_sub = req.files && req.files["certificado_sub"] ? req.files["certificado_sub"][0].originalname : null;

    const userId = req.params.id;

    const [resultado] = await pool.query("INSERT INTO subasta (fecha_inicio_sub, fecha_fin_sub, imagen_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, estado_sub, certificado_sub, descripcion_sub, fk_variedad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [ fecha_inicio_sub, fecha_fin_sub, imagen_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, "abierta", certificado_sub, descripcion_sub, fk_variedad ]);
    if (resultado.affectedRows > 0) {
      const subastaId = resultado.insertId;
      if (userId && !isNaN(userId)) {
        const tipoNotificacion = "mensaje";
        const [resultadoNotif] = await pool.query("INSERT INTO notificaciones (tipo_not, texto_not, fk_id_subasta, fk_id_usuario) VALUES (?, ?, ?, ?)", [tipoNotificacion, "Nueva subasta creada", subastaId, userId ]);
        if (resultadoNotif.affectedRows > 0) {
          res.status(200).json({ message: "Subasta creada con éxito y notificación enviada" });
        } else {
          res.status(400).json({ message: "Error al crear la notificación para la subasta" });
        }
      } else {
        res.status(200).json({ message: "Subasta creada con éxito, pero no se pudo enviar la notificación (usuario no identificado o id no válido)" });
      }
    } else {
      res.status(400).json({ message: "Error al crear la subasta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const listar = async (req, res) => {
  try {
    const [resultado] = await pool.query(
    `
      SELECT s.pk_id_sub, s.fecha_inicio_sub, s.fecha_fin_sub, s.imagen_sub, s.precio_inicial_sub, s.precio_final_sub,s.cantidad_sub, s.unidad_peso_sub,s.estado_sub,s.certificado_sub,s.descripcion_sub,s.fk_variedad, t.nombre_tipo_vari, v.estado_vari, u.pk_cedula_user, u.email_user, u.nombre_user, u.imagen_user, u.telefono_user, u.rol_user, f.nombre_fin, f.imagen_fin, e.nombre_vere, m.nombre_muni, d.nombre_depar 
      FROM subasta s 
      INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari 
      INNER JOIN finca f ON v.fk_finca = f.pk_id_fin 
      INNER JOIN veredas e ON f.fk_vereda = e.pk_id_vere 
      INNER JOIN municipio m ON e.fk_municipio = m.pk_codigo_muni 
      INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar 
      INNER JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari 
      INNER JOIN usuarios u ON f.fk_id_usuario = u.pk_cedula_user
    `);

    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ message: "No se encontraron subastas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const getSubGanador = async (req, res) => {
  try {
    const id = req.params.id;
    const [resultado] = await pool.query(`
        SELECT s.pk_id_sub, s.fecha_inicio_sub, s.fecha_fin_sub, s.imagen_sub, s.precio_inicial_sub, s.precio_final_sub,  s.cantidad_sub, s.unidad_peso_sub, s.estado_sub, s.certificado_sub, s.descripcion_sub, s.fk_variedad,  t.nombre_tipo_vari, v.estado_vari, u.pk_cedula_user AS propietario_cedula, u.email_user AS propietario_email,  u.nombre_user AS propietario_nombre, u.imagen_user AS propietario_imagen, u.telefono_user AS propietario_telefono,  u.rol_user AS propietario_rol, f.nombre_fin, f.imagen_fin, e.nombre_vere, m.nombre_muni, d.nombre_depar
        FROM subasta s
        INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari
        INNER JOIN finca f ON v.fk_finca = f.pk_id_fin
        INNER JOIN veredas e ON f.fk_vereda = e.pk_id_vere
        INNER JOIN municipio m ON e.fk_municipio = m.pk_codigo_muni
        INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar
        INNER JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari
        INNER JOIN usuarios u ON f.fk_id_usuario = u.pk_cedula_user
        INNER JOIN usuarios ug ON s.ganador_sub = ug.pk_cedula_user
        WHERE s.ganador_sub = ?
      `, [id]);

      const [countResult] = await pool.query(`
        SELECT COUNT(*) AS total_subastas_ganadas 
        FROM subasta
        WHERE ganador_sub = ?
      `, [id]);

      const totalSubastasGanadas = countResult[0].total_subastas_ganadas;
  
      if (resultado.length > 0) {
        res.status(200).json({ total_subastas_ganadas: totalSubastasGanadas, data: resultado});
      } else {
        res.status(200).json({ message: "No se encontraron subastas ganadas por este usuario",});
      }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
}

export const listarSubsActivas = async (req, res) => {
  try {
    const [resultado] = await pool.query(`
      SELECT s.pk_id_sub, s.fecha_inicio_sub, s.fecha_fin_sub, s.imagen_sub, s.precio_inicial_sub, s.precio_final_sub,s.cantidad_sub, s.unidad_peso_sub,s.estado_sub,s.certificado_sub,s.descripcion_sub,s.fk_variedad, t.nombre_tipo_vari, v.estado_vari, u.pk_cedula_user, u.email_user, u.nombre_user, u.imagen_user, u.telefono_user, u.rol_user, f.nombre_fin, f.imagen_fin, e.nombre_vere, m.nombre_muni, d.nombre_depar 
      FROM subasta s 
      INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari 
      INNER JOIN finca f ON v.fk_finca = f.pk_id_fin 
      INNER JOIN veredas e ON f.fk_vereda = e.pk_id_vere 
      INNER JOIN municipio m ON e.fk_municipio = m.pk_codigo_muni 
      INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar 
      INNER JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari 
      INNER JOIN usuarios u ON f.fk_id_usuario = u.pk_cedula_user
      WHERE s.estado_sub IN ('abierta', 'proceso', 'espera')
      ORDER BY s.pk_id_sub
    `);

    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(200).json({ message: "No se encontraron subastas." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const updateSubGanador = async (req, res) => {
  try {
    const id = req.params.id;
    const { precio_final_sub, ganador_sub } = req.body;

    const sql = "UPDATE subasta SET precio_final_sub = IFNULL(?, precio_final_sub), ganador_sub = IFNULL(?, ganador_sub) WHERE pk_id_sub = ?";
    const [result] = await pool.query(sql, [precio_final_sub, ganador_sub, id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Se estableció el ganador con éxito" });
    } else {
      res.status(404).json({ message: "Error al establecer el ganador de la subasta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const actualizar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, descripcion_sub, fk_variedad, } = req.body;

    const imagen_sub = req.files && req.files.imagen_sub ? req.files.imagen_sub[0].originalname : null;
    const certificado_sub = req.files && req.files.certificado_sub ? req.files.certificado_sub[0].originalname : null;

    let sql = `
      UPDATE subasta SET 
      fecha_inicio_sub = IFNULL(?, fecha_inicio_sub),
      fecha_fin_sub = IFNULL(?, fecha_fin_sub),
      precio_inicial_sub = IFNULL(?, precio_inicial_sub),
      unidad_peso_sub = IFNULL(?, unidad_peso_sub),
      cantidad_sub = IFNULL(?, cantidad_sub),
      descripcion_sub = IFNULL(?, descripcion_sub),
      fk_variedad = IFNULL(?, fk_variedad)
    `;
    const params = [ fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, descripcion_sub, fk_variedad, ];

    if (imagen_sub) {
      sql += `, imagen_sub = ?`;
      params.push(imagen_sub);
    }

    if (certificado_sub) {
      sql += `, certificado_sub = ?`;
      params.push(certificado_sub);
    }

    sql += ` WHERE pk_id_sub = ?`;
    params.push(id);

    const [result] = await pool.query(sql, params);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta actualizada exitosamente" });
    } else {
      res.status(404).json({ message: "Error al actualizar la subasta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const buscar = async (req, res) => {
  try {
    const subastaId = req.params.id;
    if (!subastaId) {
      return res.status(400).json({
        message: "Por favor, proporcione un id de subasta válido.",
      });
    }

    const [resultado] = await pool.query(` 
        SELECT s.*, t.nombre_tipo_vari, v.*, u.*, f.nombre_fin, f.imagen_fin, e.nombre_vere, m.nombre_muni, d.nombre_depar 
        FROM subasta s 
        INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari 
        INNER JOIN finca f ON v.fk_finca = f.pk_id_fin 
        INNER JOIN veredas e ON f.fk_vereda = e.pk_id_vere 
        INNER JOIN municipio m ON e.fk_municipio = m.pk_codigo_muni 
        INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar 
        INNER JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari 
        INNER JOIN usuarios u ON f.fk_id_usuario = u.pk_cedula_user 
        WHERE pk_id_sub = ?
      `,
      [subastaId]
    );

    if (resultado.length > 0) {
      res.status(200).json({ message: "Datos de subasta obtenidos correctamente",data: resultado[0] });
    } else {
      res.status(404).json({ message: "No se encontró ninguna subasta con el id consultado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const buscarSubastaForUser = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ message: "Por favor, proporcione un ID de usuario válido." })
    }

    const [resultado] = await pool.query(`
      SELECT s.*, 
        (SELECT COUNT(*) FROM subasta WHERE fk_variedad IN (SELECT pk_id_vari FROM variedad WHERE fk_finca IN (SELECT pk_id_fin FROM finca WHERE fk_id_usuario = '${id}'))) AS cantidad,
        t.nombre_tipo_vari, v.*, 
        u.email_user, u.pk_cedula_user, u.nombre_user, u.imagen_user, u.telefono_user, u.rol_user, 
        f.nombre_fin, f.imagen_fin, e.nombre_vere, m.nombre_muni, d.nombre_depar, 
        ug.pk_cedula_user AS ganador_cedula, ug.email_user AS ganador_email, ug.nombre_user AS ganador_nombre, 
        ug.imagen_user AS ganador_imagen, ug.telefono_user AS ganador_telefono, ug.rol_user AS ganador_rol
      FROM subasta s
      INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari 
      INNER JOIN finca f ON v.fk_finca = f.pk_id_fin 
      INNER JOIN veredas e ON f.fk_vereda = e.pk_id_vere 
      INNER JOIN municipio m ON e.fk_municipio = m.pk_codigo_muni 
      INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar 
      INNER JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari 
      INNER JOIN usuarios u ON f.fk_id_usuario = u.pk_cedula_user
      LEFT JOIN usuarios ug ON s.ganador_sub = ug.pk_cedula_user
      WHERE u.pk_cedula_user = '${id}'
    `);

    if (resultado.length > 0) {
      res.status(200).json({ message: "Datos de subasta obtenidos correctamente", total_subastas: resultado[0].cantidad, data: resultado });
    } else {
      res.status(204).json({ message: "No se encontraron subastas para el usuario proporcionado." })
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    const [resultado] = await pool.query("DELETE FROM subasta WHERE pk_id_sub = ?",[id]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: "Subasta eliminada exitosamente." });
    } else {
      res.status(404).json({ message: "No se encontró una subasta con el id proporcionado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const designarDatos = async (req, res) => {
  try {
    const id = req.params.id;
    const [resultado] = await pool.query("UPDATE subasta SET precio_final_sub = NULL, ganador_sub = NULL WHERE pk_id_sub = ?", [id]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: "Datos de subasta cambiados exitosamente." });
    } else {
      res.status(404).json({ message: "No se encontró una subasta con el ID proporcionado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const SubastaAbierta = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query( `UPDATE subasta SET estado_sub = 1 WHERE pk_id_sub = '${id}'` );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta activada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const SubastaEspera = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE subasta SET estado_sub = 2 WHERE pk_id_sub = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta en Espera" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const SubastaCerrada = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE subasta SET estado_sub = 3 WHERE pk_id_sub = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta cerrada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const SubastaProceso = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE subasta SET estado_sub = 4 WHERE pk_id_sub = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta en Proceso" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const listAllDatesSub = async (req, res) => {
  try {
    const sql1 = `
      SELECT 
        COUNT(pk_id_sub) AS todas_las_subastas,
        COUNT(CASE WHEN estado_sub = 'abierta' THEN 1 END) AS subastas_abiertas,
        COUNT(CASE WHEN estado_sub = 'espera' THEN 1 END) AS subastas_en_espera,
        COUNT(CASE WHEN estado_sub = 'cerrada' THEN 1 END) AS subastas_cerradas,
        COUNT(CASE WHEN estado_sub = 'proceso' THEN 1 END) AS subastas_en_proceso
      FROM subasta
    `;

    const sql2 = `
      SELECT COUNT(*) AS subastas_con_ganador_y_precio
      FROM subasta
      WHERE ganador_sub IS NOT NULL AND precio_final_sub IS NOT NULL
    `;

    const sql3 = `
      SELECT COUNT(*) AS subastas_sin_ganador_o_precio_inactivas
      FROM subasta
      WHERE (ganador_sub IS NULL OR precio_final_sub IS NULL) AND estado_sub = 'cerrada'
    `;

    const sql4 = `
      SELECT COUNT(*) AS subastas_no_terminadas
      FROM subasta
      WHERE estado_sub != 'cerrada'
    `;

    const sql5 = `
      WITH meses AS (
        SELECT 1 AS mes UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6 UNION ALL
        SELECT 7 UNION ALL
        SELECT 8 UNION ALL
        SELECT 9 UNION ALL
        SELECT 10 UNION ALL
        SELECT 11 UNION ALL
        SELECT 12
      )
      SELECT 
        CASE meses.mes
          WHEN 1 THEN 'Enero'
          WHEN 2 THEN 'Febrero'
          WHEN 3 THEN 'Marzo'
          WHEN 4 THEN 'Abril'
          WHEN 5 THEN 'Mayo'
          WHEN 6 THEN 'Junio'
          WHEN 7 THEN 'Julio'
          WHEN 8 THEN 'Agosto'
          WHEN 9 THEN 'Septiembre'
          WHEN 10 THEN 'Octubre'
          WHEN 11 THEN 'Noviembre'
          WHEN 12 THEN 'Diciembre'
        END AS mes,
        COALESCE(COUNT(subasta.pk_id_sub), 0) AS subastas
      FROM 
        meses
      LEFT JOIN 
        subasta ON MONTH(subasta.fecha_fin_sub) = meses.mes
      GROUP BY 
        meses.mes
      ORDER BY 
        meses.mes;
    `;

    const sql6 = `
      SELECT 
        years.año AS año,
        COALESCE(COUNT(subasta.pk_id_sub), 0) AS subastas_por_año
      FROM (
        SELECT YEAR(CURDATE()) - 4 AS año
        UNION ALL
        SELECT YEAR(CURDATE()) - 3
        UNION ALL
        SELECT YEAR(CURDATE()) - 2
        UNION ALL
        SELECT YEAR(CURDATE()) - 1
        UNION ALL
        SELECT YEAR(CURDATE())
        UNION ALL
        SELECT YEAR(CURDATE()) + 1
      ) AS years
      LEFT JOIN subasta ON YEAR(subasta.fecha_fin_sub) = years.año
      GROUP BY years.año
      ORDER BY years.año;
    `;

    
    const sql7 = `
      SELECT 
        tv.nombre_tipo_vari AS variedad, 
        COUNT(s.pk_id_sub) AS subastas_por_variedad
      FROM subasta s
      JOIN variedad v ON s.fk_variedad = v.pk_id_vari
      JOIN tipo_variedad tv ON v.fk_tipo_variedad = tv.pk_id_tipo_vari
      GROUP BY tv.nombre_tipo_vari
    `;

    const sql8 = `
      SELECT 
        AVG(precio_final_sub) AS precio_promedio,
        MAX(precio_final_sub) AS precio_maximo,
        MIN(precio_final_sub) AS precio_minimo
      FROM subasta
      WHERE estado_sub = 'cerrada'
    `;

    const [result1] = await pool.query(sql1);
    const [result2] = await pool.query(sql2);
    const [result3] = await pool.query(sql3);
    const [result4] = await pool.query(sql4);
    const [result5] = await pool.query(sql5);
    const [result6] = await pool.query(sql6);
    const [result7] = await pool.query(sql7);
    const [result8] = await pool.query(sql8);
    if (result1, result2, result3, result4, result5, result6, result7, result8) {
      res.status(200).json({ message: "Estadisticas obtenidas exitosamente",
        resumen_subastas: result1,
        estadisticas_subastas: {
          subastas_con_ganador_y_precio: result2[0].subastas_con_ganador_y_precio,
          subastas_sin_ganador_o_precio_inactivas: result3[0].subastas_sin_ganador_o_precio_inactivas,
          subastas_no_terminadas: result4[0].subastas_no_terminadas
        },
        subastas_por_mes: result5,
        subastas_por_año: result6,
        subastas_por_variedad: result7,
        promedio_precio: result8,
      });
    } else {
      res.status(404).json({ message: "Error al obtener las estadisticas datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error });
  }
};
