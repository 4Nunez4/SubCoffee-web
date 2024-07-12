import React from "react";
import { User } from "@nextui-org/react";

const UserCardMolecule = ({ user, index }) => {
  console.log(user);
  return (
    <div
      key={index}
      className="border border-grisMedio bg-white flex rounded-lg shadow-md p-2 transition duration-300 ease-in-out hover:bg-blancoMedio1 cursor-pointer hover:-translate-y-1 hover:scale-105"
    >
      <User
        avatarProps={{ radius: "xl", src: user.imagen_user }}
        description={user.nombre_user}
      >
        <p>{user.nombre_user}</p>
        <p>{user.email_user}</p>
      </User>
    </div>
  );
};

export default UserCardMolecule;
