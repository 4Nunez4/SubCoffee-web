import React from "react";
import TextAtom from "../atoms/TextAtom";
import AvatarAtom from "../atoms/AvatarAtom";

const UserCardMolecule = ({ user, index }) => {
  return (
    <div
      key={index}
      className="border border-grisMedio bg-white flex rounded-lg shadow-md p-2 transition duration-300 ease-in-out hover:bg-blancoMedio1 cursor-pointer hover:-translate-y-1 hover:scale-105"
    >
      <AvatarAtom img="/profile_user.jfif" />
      <TextAtom className="font-bold text-grisOscuro"> {user.nombre_user} </TextAtom>
    </div>
  );
};

export default UserCardMolecule;
