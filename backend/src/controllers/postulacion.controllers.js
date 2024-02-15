import { pool } from '../database/conexion';
import { validationResult } from "express-validator";

export const guardarPostulacion = async (req, res) => {
  const { estado_pos, monto_inicial_pos, sentimiento_pos, oferta_pos } = req.body;
  try {
    const [rows] = await pool.query("INSERT INTO postulacion (estado_pos, monto_inicial_pos, sentimiento_pos, oferta_pos) VALUES (?, ?, ?, ?)", [estado_pos, monto_inicial_pos, sentimiento_pos, oferta_pos]);
    if (rows.affectedRows > 0) {
      return res.status(200).json({
        "status": 200,
        "message": "Se registró con éxito la postulación"
      });
    } else {
      return res.status(401).json({
        "status": 401,
        "message": "No se registró con éxito la postulación"
      });
    }
  } catch (e) {
    return res.status(500).json({
      "status": 500,
      "message": "Error en el servidor: " + e
    });
  }
}
export const editarPostulacion = async (req, res) => {
  try {
    
    let { postulacionId, updatedEstado, updatedMonto, updatedSentimiento, updatedOferta } = req.body;

   
    let sql = `UPDATE variedades SET estado_pos = '${updatedEstado}', monto_inicial_pos = ${updatedMonto}, sentimiento_pos = '${updatedSentimiento}', oferta_pos = '${updatedOferta}' WHERE id = ${postulacionId}`;

  
    const [rows] = await pool.query(sql);

    if (rows.affectedRows > 0) {
      return res.status(200).json({
        "status": 200,
        "message": "Se actualizó con éxito la postulación"
      });
    } else {
      return res.status(401).json({
        "status": 401,
        "message": "No se pudo actualizar la postulación"
      });
    }
  } catch (e) {
    return res.status(500).json({
      "status": 500,
      "message": "Error en el servidor: " + e
    });
  }
}

export const eliminarPostulacion = async (req, res) => {
  try {

      let postulacionId = req.body.postulacionId || req.params.postulacionId;


    let sql = `DELETE FROM variedades WHERE id = ${postulacionId}`;


    const [rows] = await pool.query(sql);

   
    if (rows.affectedRows > 0) {
      return res.status(200).json({
        "status": 200,
        "message": "Se eliminó con éxito la postulación"
      });
    } else {
      return res.status(401).json({
        "status": 401,
        "message": "No se pudo eliminar la postulación"
      });
    }
  } catch (e) {
    return res.status(500).json({
      "status": 500,
      "message": "Error en el servidor: " + e
    });
  }
}

export const getPostulacion = async (req, res) => {
   try{

      const[result]= await pool.query("select * from postulacion");
      res.status(200).json({message:'Postulaciones:' + result});


  }

  catch(err){
      res.status(500).json({ message:'error en listar Postulacion: '+err});
  }
}

