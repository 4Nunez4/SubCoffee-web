import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axios";
import { icono } from "../components/atoms/IconsAtom";
import IconHeaderAtom from "../components/atoms/IconHeaderAtom";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/v1/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Mueve la definición de UserCardMolecule fuera del componente UsersPage
  const UserCardMolecule = ({ user }) => {
    return (
      <div>
        {/* Renderiza los detalles del usuario */}
        <p>Nombre: {user.nombre_user}</p>
        <p>Email: {user.email_user}</p>
        {/* Puedes agregar más detalles del usuario aquí */}
      </div>
    );
  };

  // Mueve la definición de UsersListOrganism fuera del componente UsersPage
  const UsersListOrganism = ({ users }) => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
        {users.map((user) => (
          // Renderiza un enlace que lleva al perfil de cada usuario
          <Link key={user.pk_cedula_user} to={`/profile/${user.pk_cedula_user}`}>
            {/* Dentro del enlace, renderiza el componente UserCardMolecule */}
            <UserCardMolecule user={user} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-72 mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold">Usuarios</h1>
        <IconHeaderAtom>
          <icono.iconoBuscar className="h-5 w-5 text-negro" />
        </IconHeaderAtom>
      </div>
      <UsersListOrganism users={users} />
    </div>
  );
}

export default UsersPage;
