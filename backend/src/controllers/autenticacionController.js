
import { pool } from "../databases/conexion.js";
import  Jwt from "jsonwebtoken";

export const validarUsuario =async(req, res)=>{
    try{
        let {email_user,password_user}=req.body;
        let sql = `select * from usuarios where email_user='${email_user}' and password_user='${password_user}'`;
        const[rows]=await pool.query(sql);
        if(rows.length > 0){
            // PARA GENERAR EL TOKEN 
        let token=Jwt.sign({rows},process.env.AUT_SECRET,{expiresIn:process.env.AUT_EXPIRET})
        return res.status(200).json({ 'user':rows , 'token':token, message: 'token generado con exito'});
        } else{
          return res.status(404).json({"message":"usuario no autorizado"})  
        } 
    }catch{
        return res.status(500).json({"message":"el servidor esta caido intente otra vez"})
    }
}

export const validartoken=async(req,res,next)=>{
    let token_usuario = req.headers['token'];
    if(!token_usuario){
        return res.status(404).json({"message":"usuario no autorizado"})
    }else{
        const token=Jwt.verify(token_usuario,process.env.AUT_SECRET,(error,decoded)=>{
            if(error){
                return res.status(404).json({"message":"token incorrecto"})
            }else{
                next();
            }
        })
    }

}