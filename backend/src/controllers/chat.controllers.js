import {pool} from "../db.js"

export const getChats = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM chat WHERE fk_id_subasta = ?", [req.body.idSubasta]);
        
        let response = {};
        if (rows.length >  0) {
            response = { message: "Mensajes recuperados con éxito.", chats: rows };
        } else {
            response = { message: "No se encontraron mensajes con el ID de subasta proporcionado." };
        }
        
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al obtener los mensajes de la base de datos:", error);
        return res.status(500).json({ message: "Ocurrió un error al buscar los mensajes. Error: " + error.message });
    }
};

export const getChat = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT mensaje_chat FROM chat WHERE mensaje_chat = ?", [req.body.message]);
        if (rows.length >  0) {
            res.status(200).json({ message: "Mensaje encontrado", chat: rows });
        } else {
            res.status(404).json({ message: "No se encontró el mensaje: " + req.body.message });
        }
    } catch (error) {
        console.error("Error al obtener el mensaje de la base de datos:", error);
        return res.status(500).json({ message: "Ocurrió un error al buscar el mensaje. Error: " + error.message });
    }
};

export const createChat = (req, res) => {
    const {message, idSubasta, idUsuario} = req.body
    try {
        pool.query("INSERT INTO chat(mensaje_chat, fk_id_subasta, fk_id_usuario) VALUES (?, ?, ?)", [message, idSubasta, idUsuario])
        res.status(200).json({message:"Registro de mensaje exitoso"})
    } catch (error) {
        return res.status(500).json({ message: "No se pudo crear el mensaje " +error })
    }
}

export const updateChat = async (req, res) => {
    try {
        const updates = req.body;
        const id = req.body.id;

        // Assuming updates contains fields like 'mensaje_chat', 'fk_id_subasta', etc.
        const [result] = await pool.query("UPDATE chat SET mensaje_chat = ? WHERE id_chat = ?", [updates.mensaje_chat, id]);

        if (result.affectedRows >   0) {
            res.status(200).json({ message: "El mensaje ha sido actualizado con éxito." });
        } else {
            res.status(404).json({ message: "No se encontró el mensaje con el ID especificado." });
        }
    } catch (error) {
        console.error("Error al actualizar el mensaje en la base de datos:", error);
        return res.status(500).json({ message: "Ocurrió un error al actualizar el mensaje. Error: " + error.message });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM chat WHERE id_chat = ?", [req.body.id]);
        if (result.affectedRows ===  0) {
            return res.status(404).json({ message: "Chat no encontrado" });
        }
        res.status(200).json({ message: "Chat eliminado con éxito." });
    } catch (error) {
        console.error("Error al eliminar el chat: ", error);
        return res.status(500).json({ message: "No se pudo eliminar el chat. Error: " + error.message });
    }
};