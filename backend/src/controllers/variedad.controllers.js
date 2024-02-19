import {pool} from '../databases/conexion.js';



export const listarVariedad= async (req,res)=>{
  try{

      const[result]= await pool.query("select * from variedad");
      res.status(200).json(result);


  }catch(err){
      res.status(500).json({ message:'error en listar Variedad: '+err});
  }
};

export const guardarVariedad= async (req, res) => {

        const {tipo_vari, descripcion_vari, puntuacion_vari} = req.body;
        try{
            const [rows] = await pool.query("INSERT INTO variedad(tipo_vari, descripcion_vari, puntuacion_vari) VALUES (?,?,?)", [tipo_vari, descripcion_vari, puntuacion_vari  ]);
            if(rows.affectedRows){
                res.status(200).json({status:500, message:"Variedad creada con exito"});
            }else{
                res.status(404).json({status:404, message: "Error al crear la variedad"});
            }
        }catch(e){
                res.status(500).json({status:500, message:"Error Sistema: No se pudo crear la variedad" + e})
        }
}




export const actualizarVariedad = async (req, res) => {
    try {
        const id = req.params.id;
        const { tipo_vari, descripcion_vari, puntuacion_vari } = req.body;
        const [result] = await pool.query("UPDATE variedad SET tipo_vari = ?, descripcion_vari = ?, puntuacion_vari = ? WHERE pk_id_vari = ?", [tipo_vari, descripcion_vari, puntuacion_vari, id]);
        if(result.affectedRows > 0) {
            res.status(200).json({ status: 200, message: 'La variedad ha sido actualizada exitosamente' });
        }else {
            res.status(404).json({status: 404, message: "El ID de la variedad es incorrecto"})
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar la variedad', error});
    }
}


export const buscarvariedad = async (req,res) =>{
    try{
      const [rows] = await pool.query("SELECT * FROM variedad WHERE pk_id_vari = ?", [req.params.id]);
      if(rows.length >0){
        res.status(200).json({status:200, data:rows});
      }else{
        res.status(404).json({status:404, message: 'Error ID variedad no encontrada' });
      }
  
    }catch(e){
      res.status(500).json({ status:500, message: 'Error en el sistema', e });
    }
  };

  export const deleteVariedad = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM variedad WHERE pk_id_vari = ?", [req.params.id]);
        if(result.affectedRows === 0){
            res.status(404).json({status: 404, message: 'La Variedad con el ID proporcionado no existe'});
        }else {
            res.status(200).json({status: 200, message: 'Variedad eliminada exitosamente' });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error en el Sistema', error });
    }
  };