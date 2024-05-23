import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";

import UserRol from "../nextui/UserRol";
import GmailIcon from "../nextui/GmailIcon";
import Phone from "../nextui/Phone";
import FormUser from "../components/templates/FormUser";
import AuthContext from "../context/AuthContext";
import FormUserPassword from "../components/templates/FormUserPassword";
import { useSubastaContext } from "../context/SubastaContext";

function ProfileUser() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("creadas");
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalPassword, setAbrirModalPassword] = useState(false);
  const [mode, setMode] = useState("create");
  const { getUserID, user, setIdUser } = useContext(AuthContext);
  const { getSubForUser, subastaForuser } = useSubastaContext()

  useEffect(() => {
    getSubForUser(id);
  }, [id]);

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
    <div className="px-16 mb-9 ">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 sm:grid-cols-1 justify-center items-center">
                  {subastaForuser &&
                    subastaForuser.map((subasta) => (
                      <Card key={subasta.pk_id_sub} className="max-w-[320px] p-2">
                        <CardBody className="items-center w-full">
                          <span className="text-center flex justify-center items-center gap-x-3">
                            <b className="text-lg">
                              {subasta.pk_id_sub} - {subasta.nombre_tipo_vari}
                            </b>
                            <div className={`w-auto rounded-lg border
                                ${subasta.estado_sub === "abierta"? "bg-green-500 border-green-600 text-green-50": ""}
                                ${subasta.estado_sub === "proceso"? "bg-orange-500 border-orange-600 text-orange-50": ""}
                                ${subasta.estado_sub === "espera"? "bg-blue-500 border-blue-600 text-blue-50": ""}
                                ${subasta.estado_sub === "cerrada"? "bg-red-400 border-red-600 text-red-50": ""} 
                              `}
                            >
                              <p className="text-sm text-default-50 p-1">
                                {subasta.estado_sub}
                              </p>
                            </div>
                          </span>
                          <CardBody className="flex items-center">
                            <Image
                              shadow="sm"
                              radius="md"
                              alt={subasta.imagen_sub}
                              className="w-[250px] object-cover h-[200px]"
                              src={`http://localhost:4000/img/subasta/${subasta.imagen_sub}`}
                            />
                            <div className="grid gap-x-2 py-2 px-2 text-sm">
                              <div className="flex flex-col">
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Apertura:</p>
                                  <p>{new Date(subasta.fecha_inicio_sub).toLocaleString( "es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", } )}</p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Cierre:</p>
                                  <p>{new Date(subasta.fecha_fin_sub).toLocaleString( "es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", } )}</p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Ubicación:</p>
                                  <p>{subasta.nombre_vere} - {subasta.nombre_muni} -{subasta.nombre_depar} </p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Cantidad:</p>
                                  <p>{subasta.cantidad_sub} {subasta.cantidad_sub > 0 ? (subasta.unidad_peso_sub + "s") : subasta.unidad_peso_sub}</p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Tipo Variedad:</p>
                                  <p>{subasta.nombre_tipo_vari}</p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Certificado:</p>
                                  <p className="underline cursor-pointer">{subasta.certificado_sub}</p>
                                </div>
                                <div className="flex gap-x-2">
                                  <p className="font-semibold">Descripción:</p>
                                  <p>{subasta.descripcion_sub}</p>
                                </div>
                                <div className="flex gap-x-2">
                                  <p className="font-semibold">Precio base:</p>
                                  <p>${Number(subasta.precio_inicial_sub).toLocaleString("es-ES")}</p>
                                </div>
                                {subasta.estado_sub === "cerrada" ? (
                                  <div className="flex gap-x-2">
                                    <p className="font-semibold text-[#a1653d]">Precio Final:</p>
                                    <p className="text-[#009100] font-semibold">${Number(subasta.precio_final_sub).toLocaleString("es-ES")}</p>
                                  </div>
                                  ) : (
                                    <div className="flex gap-x-2">
                                      <p className="font-semibold text-[#a1653d]">Precio Final:</p>
                                      <p className="text-[#009100] font-semibold">Desconocido</p>
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          </CardBody>
                        </CardBody>
                      </Card>
                    ))}
                </div>
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