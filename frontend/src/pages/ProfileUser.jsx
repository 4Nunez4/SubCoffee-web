import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import avatarImage from "../../public/imagen_de_usuario.webp";
import axiosClient from "../api/axios";
import { useParams } from "react-router-dom";

function ProfileUser() {
  const { id } = useParams();
  const [users, setUsers] = useState({});

  useEffect(() => {
    axiosClient
      .get(`/v1/users/${id}`)
      .then((res) => {
        setUsers(res.data.data[0]);
        console.log("User data:", res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);
  
  const SubastasCreadas = [
    { id: 1, titulo: "Subasta 1", descripcion: "Descripción de la subasta 1" },
    { id: 2, titulo: "Subasta 2", descripcion: "Descripción de la subasta 2" },
    { id: 3, titulo: "Subasta 1", descripcion: "Descripción de la subasta 1" },
    { id: 4, titulo: "Subasta 2", descripcion: "Descripción de la subasta 2" },
  ];

  const SubastasGanadas = [
    { id: 1, titulo: "Subasta 3", descripcion: "Descripción de la subasta 3" },
    { id: 2, titulo: "Subasta 4", descripcion: "Descripción de la subasta 4" },
    { id: 3, titulo: "Subasta 3", descripcion: "Descripción de la subasta 3" },
    { id: 4, titulo: "Subasta 4", descripcion: "Descripción de la subasta 4" },
  ];

  const [activeTab, setActiveTab] = useState("creadas");

  const renderSubastas = (subastas) => (
    <div className="grid grid-cols-2 gap-4">
      {subastas.map((subasta) => (
        <div key={subasta.id} className="border rounded p-4">
          <h3 className="text-md font-semibold">{subasta.titulo}</h3>
          <p className="text-sm text-gray-600">{subasta.descripcion}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="px-32 mb-9">
      <div className="flex items-center justify-between mb-4 flex-col">
        <img
          src="../src/assets/finca1.jpg"
          className="w-full rounded-lg"
          alt="Finca de usuario"
        />
        <Avatar
          src={users.imagen_user ? `../../public/${users.imagen_user}` : avatarImage }
          className="w-44 h-44 text-large -mt-24"
        />
      </div>
      <div className="grid grid-cols-1 gap-y-1 mb-4">
        <span className="text-lg font-semibold">{users.nombre_user}</span>
        <span className="text-sm text-gray-600">{users.telefono_user}</span>
        <span className="text-sm text-gray-600">{users.fecha_nacimiento_user}</span>
        <span className="text-sm text-gray-600">{users.email_user}</span>
        <span className="text-sm text-gray-600">{users.descripcion_user}</span>
      </div>
      <div className="flex items-center w-full mb-4">
        <button
          className={`text-lg font-semibold mr-4 focus:outline-none ${
            activeTab === 'creadas' ? 'text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('creadas')}
        >
          Subastas creadas
        </button>
        <button
          className={`text-lg font-semibold focus:outline-none ${
            activeTab === 'ganadas' ? 'text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('ganadas')}
        >
          Subastas ganadas
        </button>
      </div>
      <div>
        {activeTab === 'creadas' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Subastas Creadas</h2>
            {renderSubastas(SubastasCreadas)}
          </div>
        )}
        {activeTab === 'ganadas' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Subastas Ganadas</h2>
            {renderSubastas(SubastasGanadas)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUser;
