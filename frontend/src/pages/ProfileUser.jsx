import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";

import UserRol from "../nextui/UserRol";
import GmailIcon from "../nextui/GmailIcon";
import Phone from "../nextui/Phone";
import FormUser from "../components/templates/FormUser";
import AuthContext from "../context/AuthContext";
import FormUserPassword from "../components/templates/FormUserPassword";

function ProfileUser() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("creadas");
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalPassword, setAbrirModalPassword] = useState(false);
  const [mode, setMode] = useState("create");
  const { getUserID, user, setIdUser } = useContext(AuthContext);

  useEffect(() => {
    getUserID(id);
  }, [id]);

  const handleToggle = (mode) => {
    setAbrirModal(true);
    setMode(mode);
  };

  useEffect(() => {
    if (user.rol_user === "comprador") {
      setActiveTab("ganadas");
    } else if (user.rol_user !== "admin") {
      setActiveTab("creadas");
    }
  }, [user]);

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
    <div className="px-28 mb-9 ">
      <FormUser
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        title={mode === 'create' ? 'Registrar Usuario' : 'Actualizar Usuario'}
        titleBtn={mode === "create" ? "Registrar" : "Actualizar"}
        mode={mode}
      />
      <FormUserPassword
        open={abrirModalPassword}
        onClose={() => setAbrirModalPassword(false)}
        title={"Actualizar contraseña"}
        titleBtn={"Actualizar"}
      />
      <div className="flex">
        <div className="flex py-4 items-center gap-x-4">
          <div className="flex flex-col justify-center">
            <Avatar
              src={
                user.imagen_user && user.imagen_user.length > 0
                  ? `http://localhost:4000/img/${user.imagen_user}`
                  : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
              }
              className="w-56 h-56"
            />
            {user.pk_cedula_user === localUser.pk_cedula_user && (
              <Button className="bg-[#e0e0e0] text-[#009100] w-full mt-2" onClick={() => {handleToggle("update"); setIdUser(user)}}>
                Editar perfil
              </Button>
            )}
            {user.pk_cedula_user === localUser.pk_cedula_user && (
              <Button className="bg-[#e0e0e0] text-[#009100] w-full mt-2" onClick={() => {setAbrirModalPassword(true); setIdUser(user)}}>
                Cambiar contraseña
              </Button>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-semibold my-2">
              {user.nombre_user}
            </span>
            <span className="text-sm text-gray-600 flex items-center">
              <Phone />
              <div>
                <p className="text-sm text-gray-900">{user.telefono_user}</p>
                <p className="text-xs text-gray-500">Teléfono</p>
              </div>
            </span>
            <span className="text-sm text-gray-600 flex items-center">
              <GmailIcon />
              <div>
                <p className="text-sm text-gray-900">{user.email_user}</p>
                <p className="text-xs text-gray-500">Correo Electrónico</p>
              </div>
            </span>
            <span className="text-sm text-gray-600 flex items-center">
              <UserRol />
              <div>
                <p className="text-sm text-gray-900">{user.rol_user}</p>
                <p className="text-xs text-gray-500">Rol de Usuario</p>
              </div>
            </span>
            <span className="text-sm text-gray-600 py-2 flex">
              {user.descripcion_user}
            </span>
          </div>
        </div>
      </div>
      {user.rol_user !== 'admin' && (
        <>
          <div className="grow border-b border-gray-400 my-4"></div>
          <div className="flex items-center w-full mb-4">
            {user.rol_user !== "comprador" && (
              <button
                className={`text-lg font-semibold mr-4 focus:outline-none ${
                  activeTab === "creadas"
                    ? "text-gray-400 mb-3 transition delay-150 duration-500 ease-in-out"
                    : "text-gray-800"
                }`}
                onClick={() => setActiveTab("creadas")}
              >
                Subastas Creadas
              </button>
            )}
            <button
              className={`text-lg font-semibold focus:outline-none ${
                activeTab === "ganadas"
                  ? "text-gray-400 mb-3 transition delay-150 duration-500 ease-in-out"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("ganadas")}
            >
              Subastas Ganadas
            </button>
          </div>
          <div>
            {user.rol_user !== "comprador" && activeTab === "creadas" && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Subastas Creadas
                </h2>
                {renderSubastas(SubastasCreadas)}
              </div>
            )}
            {activeTab === "ganadas" && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Subastas Ganadas
                </h2>
                {renderSubastas(SubastasGanadas)}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileUser;