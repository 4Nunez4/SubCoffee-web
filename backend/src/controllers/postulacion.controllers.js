import { pool } from '../databases/conexion.js';



export const getPostulaciones = async (req,res) =>{
    try {
        let sql = 'select * from postulacion'
        const [result] = await pool.query(sql)
        
        if(result.length > 0){
            return res.status(200).json(result)
        }
        else{
            return res.status(484).send({'mesage': 'Error no hay postulaciones'})
        }
    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
};


export const guardarPostulacion = async (req,res)=> {
  const {fecha_pos, estado_pos, monto_inicial_pos,oferta_pos,idUsuario } = req.body;
  try {
      const [rows] = await pool.query("INSERT INTO postulacion(fecha_pos, estado_pos, monto_inicial_pos, oferta_pos, fk_id_usuario) VALUES (?, ?, ?,?,?)", [fecha_pos, estado_pos, monto_inicial_pos, oferta_pos, idUsuario]);
      if(rows.affectedRows){
          res.status(200).json({status: 200, message: "Mensaje creado con éxito."});
      } else {
          res.status(404).json({status: 404, message: "Error al crear el mensaje." });
      }
  } catch (error) {
      res.status(500).json({status: 500, message: "No se pudo crear el mensaje." + error});
  }
};
//este sirve
export const getPostulacion = async (req,res) =>{
  try{
    const [rows] = await pool.query("SELECT * FROM postulacion WHERE fk_id_usuario = ?", [req.params.id]);
    if(rows.length >0){
      res.status(200).json({status:200, data:rows});
    }else{
      res.status(404).json({status:404, message: 'Error ID postulacion no encontrada' });
    }

  }catch(e){
    res.status(500).json({ status:500, message: 'Error al obtener las postulaciones', e });
  }
};

  export const updatePostulacion = async (req,res) =>{
    try{
      const id = req.params.id;
      const {estado_pos	,monto_inicial_pos,oferta_pos} = req.body;

      const [result] = await pool.query("UPDATE postulacion SET estado_pos = ?, monto_inicial_pos = ?, oferta_pos = ? WHERE id = ?", [estado_pos, monto_inicial_pos, oferta_pos, id]);
      if(result.affectedRows > 0){
        res.status(200).json({ status: 200, message: 'Postulacion actualizada exitosamente' });
      }
      else {
        res.status(404).json({status: 404, message: "El ID proporcionado es incorrecto"})
    }
    

  }
  catch (e) {
    res.status(500).json({ status: 500, message: 'Error al actualizar la Postulacion' + e});
  }
  };
  
export const deletePostulacion = async (req, res) => {
  try {
      const [result] = await pool.query("DELETE FROM postulacion WHERE pk_id_pos = ?", [req.params.id]);
      if(result.affectedRows === 0){
          res.status(404).json({status: 404, message: 'La Postulacion con el ID proporcionado no existe'});
      }else {
          res.status(200).json({status: 200, message: 'Postulacion eliminada exitosamente' });
      }
  } catch (error) {
      res.status(500).json({status: 500, message: 'Error al eliminar la postulacion', error });
  }
};