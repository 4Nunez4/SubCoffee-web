import React from "react";
import AvatarAtom from "./AvatarAtom";

function NotificationItemAtom({ notificacion }) {
  return (
    <div className="flex items-center gap-x-1 rounded p-1 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-100 hover:shadow-md">
      <AvatarAtom img={notificacion.foto} />
      <div>
        <p className="text-sm font-semibold">{notificacion.usuario}</p>
        <p className="text-xs">{notificacion.texto}</p>
        <p className="text-xs text-gray-400">{notificacion.fecha}</p>
      </div>
    </div>
  );
}

export default NotificationItemAtom;
