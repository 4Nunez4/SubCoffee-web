import React, { useState } from "react";
import TabSelectorMolecule from "./TabSelectorMolecule";
import NotificationListMolecule from "./NotificationListMolecule";
import MessageListMolecule from "./MessageListMolecule";

function ModalMessaAndNoti() {
  const [activeTab, setActiveTab] = useState("notificaciones");

  const handleShowNotifications = () => {
    setActiveTab("notificaciones");
  };

  const handleShowMessages = () => {
    setActiveTab("mensajes");
  };

  const Notificaciones = [
    {
      id: 1,
      usuario: "Usuario A",
      foto: "profile_user.jfif",
      texto: "¡Nuevo pedido recibido!",
      fecha: "2024-03-15",
    },
    {
      id: 2,
      usuario: "Usuario B",
      foto: "profile_user.jfif",
      texto: "Tu producto ha sido enviado.",
      fecha: "2024-03-14",
    },
    {
      id: 3,
      usuario: "Usuario C",
      foto: "profile_user.jfif",
      texto: "Tu cuenta ha sido verificada.",
      fecha: "2024-03-13",
    },
  ];

  const Mensajes = [
    {
      id: 1,
      usuario: "Usuario D",
      foto: "profile_user.jfif",
      texto: "Hola, ¿cómo estás?",
      fecha: "2024-03-15",
    },
    {
      id: 2,
      usuario: "Usuario E",
      foto: "profile_user.jfif",
      texto: "¿Podemos agendar una llamada?",
      fecha: "2024-03-14",
    },
    {
      id: 3,
      usuario: "Usuario F",
      foto: "profile_user.jfif",
      texto: "Gracias por tu compra.",
      fecha: "2024-03-13",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-3 border shadow-md">
      <TabSelectorMolecule
        activeTab={activeTab}
        handleShowNotifications={handleShowNotifications}
        handleShowMessages={handleShowMessages}
      />
      {activeTab === "notificaciones" ? (
        <NotificationListMolecule data={Notificaciones} />
      ) : (
        <MessageListMolecule data={Mensajes} />
      )}
    </div>
  );
}

export default ModalMessaAndNoti;
