import React from "react";
import AvatarAtom from "./AvatarAtom";

const MessageItemAtom = ({ mensaje }) => {
  return (
    <div className="flex items-center gap-x-1 rounded p-1 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-100 hover:shadow-md">
      <AvatarAtom
        img={mensaje.foto}
      />
      <div>
        <p className="text-sm font-semibold">{mensaje.usuario}</p>
        <p className="text-xs">{mensaje.texto}</p>
        <p className="text-xs text-gray-400">{mensaje.fecha}</p>
      </div>
    </div>
  );
};

export default MessageItemAtom;
