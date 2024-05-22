import multer from "multer";
import { pool } from "../databases/conexion.js";
import { validationResult } from "express-validator";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/subasta");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export const subastaFiles = upload.fields([
  { name: "imagen_sub" },
  { name: "certificado_sub" },
]);

export const registrar = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, descripcion_sub, fk_variedad, } = req.body;

    let imagen_sub = req.files && req.files["imagen_sub"] ? req.files["imagen_sub"][0].originalname : null;
    let certificado_sub = req.files && req.files["certificado_sub"] ? req.files["certificado_sub"][0].originalname : null;

    const [resultado] = await pool.query("INSERT INTO subasta (fecha_inicio_sub, fecha_fin_sub, imagen_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, estado_sub, certificado_sub, descripcion_sub, fk_variedad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [ fecha_inicio_sub, fecha_fin_sub, imagen_sub, precio_inicial_sub, unidad_peso_sub, cantidad_sub, "abierta", certificado_sub, descripcion_sub, fk_variedad, ]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: "Su subasta ha sido creada con exito" });
    } else {
      res.status(400).json({ message: "Error al insertar la subasta" });
    }
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor",});
  }
};

// lista todas las subastas en progreso
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
      res.status(404).json({message: "No se encontraron subastas ",});
    }
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor",});
  }
};

export const listarSubsActivas = async (req, res) => {
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
      WHERE s.estado_sub IN ('abierta', 'proceso', 'espera')
    `);

    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(200).json({message: "No se encontraron subastas.",});
    }
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor",});
  }
};

export const actualizarFechaFin = async() => {
  try {
    const { id } = req.params;
    const { fecha_fin_sub } = req.body
    const [resultado] = await pool.query(`UPDATE subasta SET fecha_fin_sub = COALESCE( ?,'${fecha_fin_sub}') WHERE  pk_id_sub = ?`, [id]);
    if (resultado.length > 0) {
      res.status(200).json({message:"Fecha actualizada con exito"})
    } else {
      res.status(404).json({message:"Error al actualizar la fecha"})
    }
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor",});
  }
}

export const actualizar = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { fecha_inicio_sub, fecha_fin_sub, precio_inicial_sub, precio_final_sub, unidad_peso_sub, cantidad_sub, estado_sub, descripcion_sub, fk_variedad, } = req.body;

    // Verificar si los archivos se subieron correctamente
    let imagen_sub =
      req.files && req.files["imagen_sub"] && req.files["imagen_sub"][0] ? req.files["imagen_sub"][0].originalname : null;
    let certificado_sub =
      req.files &&
      req.files["certificado_sub"] &&
      req.files["certificado_sub"][0] ? req.files["certificado_sub"][0].originalname : null;

    const values = [
      fecha_inicio_sub,
      fecha_fin_sub,
      imagen_sub,
      precio_inicial_sub,
      precio_final_sub,
      unidad_peso_sub,
      cantidad_sub,
      estado_sub,
      certificado_sub,
      descripcion_sub,
      fk_variedad,
      id, 
    ];

    const [resultado] = await pool.query("UPDATE subasta SET fecha_inicio_sub=COALESCE(?, fecha_inicio_sub), fecha_fin_sub=COALESCE(?, fecha_fin_sub), imagen_sub=COALESCE(?, imagen_sub), precio_inicial_sub=COALESCE(?, precio_inicial_sub), precio_final_sub=COALESCE(?, precio_final_sub), unidad_peso_sub=COALESCE(?, unidad_peso_sub), cantidad_sub=COALESCE(?, cantidad_sub), estado_sub=COALESCE(?, estado_sub), certificado_sub=COALESCE(?, certificado_sub), descripcion_sub=COALESCE(?, descripcion_sub), fk_variedad=COALESCE(?, fk_variedad) WHERE pk_id_sub=?",values);

    if (resultado.affectedRows > 0) {
      res.status(200).json({message: "La subasta ha sido actualizada exitosamente",});
    } else {
      res.status(404).json({message: "No se encontró ninguna subasta con el id proporcionado",});
    }
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor",});
  }
};

// busca una subasta
export const buscar = async (req, res) => {
  try {
    const subastaId = req.params.id;

    if (!subastaId) {
      return res.status(400).json({
        message: "Por favor, proporcione un id de subasta válido.",
      });
    }

    const [resultado] = await pool.query(
      `SELECT s.*, t.nombre_tipo_vari, v.*, u.*, f.nombre_fin, f.imagen_fin, e.nombre_vere, m.nombre_muni, d.nombre_depar 
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
      res.status(200).json({message: "Datos de subasta obtenidos correctamente",data: resultado[0],});
    } else {
      res.status(404).json({message: "No se encontró ninguna subasta con el id consultado.",});
    }
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor",});
  }
};

export const buscarSubastaForUser = async (req, res) => {
  try {
    const id = req.params.id; 

    if (!id) {
      return res.status(400).json({ message: "Por favor, proporcione un ID de usuario válido." })
    }

    const [resultado] = await pool.query(
      `SELECT s.*, t.nombre_tipo_vari, v.*, u.email_user, u.pk_cedula_user, u.nombre_user, u.imagen_user, u.telefono_user, u.rol_user, f.nombre_fin, f.imagen_fin, e.nombre_vere, m.nombre_muni, d.nombre_depar 
        FROM subasta s 
        INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari 
        INNER JOIN finca f ON v.fk_finca = f.pk_id_fin 
        INNER JOIN veredas e ON f.fk_vereda = e.pk_id_vere 
        INNER JOIN municipio m ON e.fk_municipio = m.pk_codigo_muni 
        INNER JOIN departamento d ON m.fk_departamento = d.pk_codigo_depar 
        INNER JOIN tipo_variedad t ON v.fk_tipo_variedad = t.pk_id_tipo_vari 
        INNER JOIN usuarios u ON f.fk_id_usuario = u.pk_cedula_user
        WHERE u.pk_cedula_user = '${id}'`
    );

    if (resultado.length > 0) {
      res.status(200).json({ message: "Datos de subasta obtenidos correctamente", data: resultado, });
    } else {
      res.status(204).json({message: "No se encontraron subastas para el usuario proporcionado.",})
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", });
  }
};


// elimina una subasta
export const eliminar = async (req, res) => {
  try {
    const id = req.params.id;

    const [resultado] = await pool.query("delete from subasta where pk_id_sub = ?",[id]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: "Subasta eliminada exitosamente." });
    } else {
      res.status(404).json({ message: "No se encontró una subasta con el id proporcionado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const SubastaAbierta = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query( `UPDATE subasta SET estado_sub = 1 WHERE pk_id_sub = '${id}'` );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta activada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const SubastaEspera = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE subasta SET estado_sub = 2 WHERE pk_id_sub = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta en Espera " });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const SubastaCerrada = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE subasta SET estado_sub = 3 WHERE pk_id_sub = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta cerrada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};

export const SubastaProceso = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE subasta SET estado_sub = 4 WHERE pk_id_sub = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta en Proceso" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el sistema", error: error.message });
  }
};
