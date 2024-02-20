import {pool} from "../databases/conexion.js"

export const getChats = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM chat");
        if (rows.length >  0) {
            res.status(200).json({status: 200, message: "Mensajes encontrados con exito.", data: rows });
        } else {
            res.status(404).json({status: 404, message: "No se encontraron mensajes." });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error en el sistema."});
    }
};

export const getChat = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM chat WHERE pk_id_chat = ?", [req.params.id]);
        if (rows.length >  0) {
            res.status(200).json({status: 200, message:"Mensaje encontrado con exito.", data:rows});
        } else {
            res.status(404).json({status: 404, message: "Error con ID al encontrar el mensaje." });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error en el sistema."});
    }
};

export const createChat = async (req, res) => {
    const {mensaje_chat, fk_id_usuario} = req.body;
    try {
        const [rows] = await pool.query("INSERT INTO chat(mensaje_chat, fk_id_usuario) VALUES (?, ?)", [mensaje_chat, fk_id_usuario]);
        if(rows.affectedRows){
            res.status(200).json({status: 200, message: "Mensaje creado con éxito."});
        } else {
            res.status(404).json({status: 404, message: "Error al crear el mensaje." });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error en el sistema."});
    }
};

export const updateChat = async (req, res) => {
    const id = req.params.id;
    const {mensaje_chat} = req.body;
    try {
        const [result] = await pool.query("UPDATE chat SET mensaje_chat = COALESCE(?, mensaje_chat) WHERE pk_id_chat = ?", [mensaje_chat, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({status: 200, message: "El mensaje ha sido actualizado con éxito."});
        } else {
            res.status(404).json({status: 404, message: "No se encontró el mensaje con el ID especificado."});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error en el sistema."});
    }
}

export const deleteChat = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM chat WHERE pk_id_chat = ?", [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(200).json({status: 200, message: "Mensaje eliminado con éxito."});
        }else {
            res.status(404).json({status: 404, message: "No se encontró el mensaje con el ID especificado."});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error en el sistema."});
    }
};