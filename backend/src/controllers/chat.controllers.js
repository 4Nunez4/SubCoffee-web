import {pool} from "../databases/conexion.js"

export const getChats = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM chat");
        if (result.length >  0) {
            res.status(200).json({status: 200, message: "Mensajes encontrados con exito" });
        } else {
            res.status(404).json({status: 404, message: "No se encontraron mensajes." });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al buscar los mensajes. mod getChats."});
    }
};

export const getChat = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM chat WHERE pk_id_chat = ?", [req.params.id]);
        if (rows.length >  0) {
            res.status(200).json({status: 200, message:"Mensaje encontrado con exito."});
        } else {
            res.status(404).json({status: 404, message: "Error con ID al listar el mensaje." });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Ocurrió un error al buscar el mensaje mod getChat."});
    }
};

export const createChat = async (req, res) => {
    const {mensaje, idSubasta, idUsuario} = req.body;
    try {
        const [rows] = await pool.query("INSERT INTO chat(mensaje_chat, fk_id_subasta, fk_id_usuario) VALUES (?, ?, ?)", [mensaje, idSubasta, idUsuario]);
        if(rows.affectedRows){
            res.status(200).json({status: 200, message: "Mensaje creado con éxito."});
        } else {
            res.status(404).json({status: 404, message: "Error al crear el mensaje." });
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "No se pudo crear el mensaje. mod createChat."});
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
        res.status(500).json({status: 500, message: "Ocurrió un error al actualizar el mensaje. mod updateChat."});
    }
}

export const deleteChat = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM chat WHERE pk_id_chat = ?", [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(200).json({status: 200, message: "Chat eliminado con éxito."});
        }else {
            res.status(404).json({status: 404, message: "ID de Chat no encontrado"});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "No se pudo eliminar el chat. mod deleteChat "});
    }
};