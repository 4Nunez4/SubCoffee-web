import React from "react";
import MessageItemAtom from "../atoms/MessageItemAtom";

const MessageListMolecule = ({ data }) => {
  return (
    <div className="my-2">
      {data.map((mensaje) => (
        <MessageItemAtom key={mensaje.id} mensaje={mensaje} />
      ))}
      {data.length === 0 && (
        <p className="text-gray-400 text-sm">No hay mensajes disponibles.</p>
      )}
    </div>
  );
};

export default MessageListMolecule;
