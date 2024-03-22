import React from "react";
import ChatMessage from "../organismos/ChatMessage";

function InfoChat() {
    return (
        <div className="bg-white rounded-ss-xl p-4 border border-gray-400 overflow-hidden hover:overflow-y-auto" style={{ maxHeight: '72vh' }}>
            <ChatMessage src="./src/assets/profile_user.jfif" alt="" name="Juan" content="Hola amiga" time="2024-03-08 10:40 a.m." />
            <ChatMessage src="./src/assets/profile_user4.jfif" alt="" name="Camila" content="Hola amigo" time="2024-03-08 10:41 a.m." />
            <ChatMessage src="./src/assets/profile_user.jfif" alt="" name="Juan" content="Como hacemos para el pago?" time="2024-03-08 10:42 a.m." />
            <ChatMessage src="./src/assets/profile_user.jfif" alt="" name="Juan" content="Tienes Daviplata?" time="2024-03-08 10:43 a.m." />
            <ChatMessage src="./src/assets/profile_user4.jfif" alt="" name="Camila" content="Si señor, regalame tu cuenta" time="2024-03-08 10:44 a.m." />
            <ChatMessage src="./src/assets/profile_user.jfif" alt="" name="Juan" content="628365473431" time="2024-03-08 10:44 a.m." />
            <ChatMessage src="./src/assets/profile_user4.jfif" alt="" name="Camila" content="En un rato te mando el comprobante" time="2024-03-08 10:46 a.m." />
            <ChatMessage src="./src/assets/profile_user4.jfif" alt="" name="Camila" content="Cargando..." time="2024-03-08 10:46 a.m." />
        </div>
    );
}

export default InfoChat;
