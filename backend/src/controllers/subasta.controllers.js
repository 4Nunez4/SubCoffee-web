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

// Función para registrar una subasta
///no tocar porque se jode esta 
export const registrar = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fecha_inicio_sub,
      fecha_fin_sub,
      precio_inicial_sub,
      precio_final_sub,
      unidad_peso_sub,
      cantidad_sub,
      estado_sub,
      descripcion_sub,
      fk_variedad,
    } = req.body;

    let imagen_sub =
      req.files && req.files["imagen_sub"]
        ? req.files["imagen_sub"][0].originalname
        : null;
    let certificado_sub =
      req.files && req.files["certificado_sub"]
        ? req.files["certificado_sub"][0].originalname
        : null;

    const [resultado] = await pool.query(
      "INSERT INTO subasta (fecha_inicio_sub, fecha_fin_sub, imagen_sub, precio_inicial_sub, precio_final_sub, unidad_peso_sub, cantidad_sub, estado_sub, certificado_sub, descripcion_sub, fk_variedad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
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
      ]
    );

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        mensaje: "Su subasta ha sido creada con exito",
      });
    } else {
      res.status(400).json({
        mensaje: "Error al insertar la subasta",
      });
    }
  } catch (error) {
    console.error("Error en el bloque try:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};
///no tocar porque se jode esta monda

// lista todas las subastas en progreso
export const listar = async (req, res) => {
  try {
    const [resultado] = await pool.query(
      "SELECT s.pk_id_sub, s.fecha_inicio_sub, s.fecha_fin_sub, s.imagen_sub, s.precio_inicial_sub, s.precio_final_sub,s.cantidad_sub,s.estado_sub,s.certificado_sub,s.descripcion_sub,s.fk_variedad, v.descripcion_vari, v.imagen_vari, v.estado_vari FROM subasta s INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari "
    );

    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({
        mensaje: "No se encontraron subastas :c",
      });
    }
  } catch (error) {
    console.error("Error en el bloque try:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};
// actualizar una subasta
///no tocar porque se jode esta monda
export const actualizar = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      fecha_inicio_sub,
      fecha_fin_sub,
      precio_inicial_sub,
      precio_final_sub,
      unidad_peso_sub,
      cantidad_sub,
      estado_sub,
      descripcion_sub,
      fk_variedad,
    } = req.body;

    // Verificar si los archivos se subieron correctamente
    let imagen_sub =
      req.files && req.files["imagen_sub"] && req.files["imagen_sub"][0]
        ? req.files["imagen_sub"][0].originalname
        : null;
    let certificado_sub =
      req.files &&
      req.files["certificado_sub"] &&
      req.files["certificado_sub"][0]
        ? req.files["certificado_sub"][0].originalname
        : null;

    // Preparar los valores para la actualización
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
      id, // El ID de la subasta a actualizar
    ];

    const [resultado] = await pool.query(
      "UPDATE subasta SET fecha_inicio_sub=COALESCE(?, fecha_inicio_sub), fecha_fin_sub=COALESCE(?, fecha_fin_sub), imagen_sub=COALESCE(?, imagen_sub), precio_inicial_sub=COALESCE(?, precio_inicial_sub), precio_final_sub=COALESCE(?, precio_final_sub), unidad_peso_sub=COALESCE(?, unidad_peso_sub), cantidad_sub=COALESCE(?, cantidad_sub), estado_sub=COALESCE(?, estado_sub), certificado_sub=COALESCE(?, certificado_sub), descripcion_sub=COALESCE(?, descripcion_sub), fk_variedad=COALESCE(?, fk_variedad) WHERE pk_id_sub=?",
      values
    );

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        mensaje: "La subasta ha sido actualizada exitosamente",
      });
    } else {
      res.status(404).json({
        mensaje: "No se encontró ninguna subasta con el id proporcionado",
      });
    }
  } catch (error) {
    console.error("Error en el bloque try:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};
///no tocar porque se jode esta monda

// busca una subasta
export const buscar = async (req, res) => {
  try {
    const subastaId = req.params.id;

    if (!subastaId) {
      return res.status(400).json({
        mensaje: "Por favor, proporcione un id de subasta válido.",
      });
    }

    const [resultado] = await pool.query(
      "SELECT s.pk_id_sub, s.fecha_inicio_sub, s.fecha_fin_sub, s.imagen_sub, s.precio_inicial_sub, s.precio_final_sub,s.cantidad_sub,s.estado_sub,s.certificado_sub,s.descripcion_sub,s.fk_variedad, v.descripcion_vari, v.imagen_vari, v.estado_vari FROM subasta s INNER JOIN variedad v ON s.fk_variedad = v.pk_id_vari where pk_id_sub = ?",
      [subastaId]
    );

    if (resultado.length > 0) {
      res.status(200).json({
        mensaje: "Datos de subasta obtenidos correctamente",
        data: resultado[0],
      });
    } else {
      res.status(404).json({
        mensaje: "No se encontró ninguna subasta con el id consultado.",
      });
    }
  } catch (error) {
    console.error("Error en el bloque try:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};
// elimina una subasta
export const eliminar = async (req, res) => {
  try {
    const id = req.params.id;

    const [resultado] = await pool.query(
      "delete from subasta where pk_id_sub = ?",
      [id]
    );

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        mensaje: "Subasta eliminada exitosamente.",
      });
    } else {
      res.status(404).json({
        mensaje: "No se encontró una subasta con el id proporcionado.",
      });
    }
  } catch (error) {
    console.error("Error en el bloque try:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};
export const SubastaAbierta = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(
      `UPDATE subasta SET estado_sub = 1 WHERE pk_id_sub = '${id}'`
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta Abierta " });
    } else {
      res
        .status(404)
        .json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el sistema", error: error.message });
  }
};

export const SubastaEspera = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(
      `UPDATE subasta SET estado_sub = 2 WHERE pk_id_sub = ${id}`
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta en Espera " });
    } else {
      res
        .status(404)
        .json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el sistema", error: error.message });
  }
};
export const SubastaCerrada = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(
      `UPDATE subasta SET estado_sub = 3 WHERE pk_id_sub = '${id}'`
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta Cerrada" });
    } else {
      res
        .status(404)
        .json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el sistema", error: error.message });
  }
};

export const SubastaProceso = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(
      `UPDATE subasta SET estado_sub = 4 WHERE pk_id_sub = ${id}`
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Subasta en Proceso" });
    } else {
      res
        .status(404)
        .json({ message: `No se encontró ninguna Subasta con el ID ${id}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el sistema", error: error.message });
  }
};
