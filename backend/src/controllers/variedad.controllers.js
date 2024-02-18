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
                res.status(500).json({status:500, message:"No se pudo crear la variedad" + e})
        }
}




export const actualizarVariedad = async (req, res) => {
    const id = req.params.id;
    const { tipo_vari } = req.body;
    
    try {
        const [result] = await pool.query("UPDATE variedad SET tipo_vari = COALESCE(?, tipo_vari) WHERE pk_id_vari = ?", [tipo_vari, id]);
        
        if (result.affectedRows > 0) {
            res.status(200).json({ status: 200, message: "La variedad ha sido actualizada con éxito." });
        } else {
            res.status(404).json({ status: 404, message: "No se encontró la variedad con el ID especificado." });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Ocurrió un error al actualizar la variedad." });
    }
};




export const buscarvariedad= async (req,res)=>{
    try {
        let sql = 'select * from variedad where pk_id_vari = ?'
        const [result] = await pool.query(sql)
        
        if(result.length > 0){
            return res.status(200).json(result)
        }
        else{
            return res.status(484).send({'mesage': 'Error no hay variedades'})
        }
    } catch (error) {
        res.status(500).json({'status': 500,'mesage': 'ERROR SERVIDOR' + error})
    }
};
