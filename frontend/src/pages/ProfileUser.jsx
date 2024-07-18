import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import "./scroll.css";

import FormUser from "../components/templates/FormUser";
import FormUserPassword from "../components/templates/FormUserPassword";
import FormCalificaion from "../components/templates/FormCalificaion";

import { useAuthContext } from "../context/AuthContext";
import { useSubastaContext } from "../context/SubastaContext";
import { useCalificacionesContext } from "../context/CalificacionesContext";
import ModalSubCoffee from "../components/templates/ModalSubCoffee";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function ProfileUser() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("creadas");
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalCalificacion, setAbrirModalCalificacion] = useState(false);
  const [abrirModalPassword, setAbrirModalPassword] = useState(false);
  const [mode, setMode] = useState("create");
  const { getUserID, user, setIdUser, getUsers } = useAuthContext();
  const {
    getSubForUser,
    subastaForuser,
    getSubGanador,
    subastaGanador,
    setIdSubasta,
    totalDeSubastas,
    totalDeSubastasGanadas
  } = useSubastaContext();
  const { getCalificacionesUser, stats } = useCalificacionesContext();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    getCalificacionesUser(id);
  }, [id, getCalificacionesUser]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getSubForUser(id);
    getUserID(id);
    getSubGanador(id);
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

  const renderAverageStars = (average) => {
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 !== 0;
    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar
            key={index}
            size={20}
            color={colors.orange}
            className="mr-1"
          />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt size={20} color={colors.orange} className="mr-1" />
        )}
        {Array.from(
          { length: 5 - fullStars - (hasHalfStar ? 1 : 0) },
          (_, index) => (
            <FaStar
              key={index + fullStars + 1}
              size={20}
              color={colors.grey}
              className="mr-1"
            />
          )
        )}
      </div>
    );
  };

  const [hoveredLinks, setHoveredLinks] = useState({});

  const handleMouseEnter = (id, type) => {
    setHoveredLinks((prevState) => ({ ...prevState, [`${id}_${type}`]: true }));
  };

  const handleMouseLeave = (id, type) => {
    setHoveredLinks((prevState) => ({
      ...prevState,
      [`${id}_${type}`]: false,
    }));
  };

  const [abrirModalSub, setAbrirModalSub] = useState(false);

  const handdleModaSub = (id) => {
    setAbrirModalSub(true);
    setIdSubasta(id);
  };

  return (
    <div className="px-16">
      <ModalSubCoffee
        open={abrirModalSub}
        onClose={() => setAbrirModalSub(false)}
      />
      <FormUser
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        title={mode === "create" ? "Registrar Usuario" : "Actualizar Usuario"}
        titleBtn={mode === "create" ? "Registrar" : "Actualizar"}
        mode={mode}
      />
      <FormUserPassword
        open={abrirModalPassword}
        onClose={() => setAbrirModalPassword(false)}
        title={"Actualizar contraseña"}
        titleBtn={"Actualizar"}
      />
      <div className="grid grid-cols-2 gap-1 mt-5 bg-white shadow-md rounded-lg overflow-hidden p-10">
        <div className="flex">
          <div className="flex justify-center items-center col-span-1">
            <Avatar
              src={
                user.imagen_user && user.imagen_user.length > 0
                  ? `http://localhost:4000/usuarios/${user.imagen_user}`
                  : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
              }
              className="w-56 h-56"
            />
          </div>
          <div className="flex justify-start items-center col-span-1 ml-4">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold my-2 text-[#323232]">
                {user.nombre_user}
              </span>
              <span className="text-sm text-gray-600 flex items-center mb-2">
                <div>
                  <p className="text-sm text-gray-900">{user.rol_user}</p>
                  <p className="text-xs text-gray-500">Rol de Usuario</p>
                </div>
              </span>
              <span className="text-sm text-gray-600 flex items-center mb-2">
                <div>
                  <p className="text-sm text-gray-900">{user.email_user}</p>
                  <p className="text-xs text-gray-500">Correo Electrónico</p>
                </div>
              </span>
              <span className="text-sm text-[#919190] flex items-center mb-2">
                <div>
                  <p className="text-sm text-gray-900">{user.telefono_user}</p>
                  <p className="text-xs text-gray-500">Teléfono</p>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3">
          {user.rol_user !== "admin" && (
            <>
              <div className="w-full flex flex-col justify-end items-center -mb-4">
                <div className="flex flex-col items-center">
                  {stats && stats.promedio != null && !isNaN(stats.promedio) ? (
                    <div className="flex gap-x-2 flex-col items-center">
                      <div className="text-6xl font-bold mx-2">
                        {parseFloat(stats.promedio).toFixed(1)}
                      </div>
                      {renderAverageStars(stats.promedio)}
                    </div>
                  ) : (
                    <div className="flex w-full justify-center">
                      <p className="text-xl my-2 text-gray-400 font-semibold">Usuario sin calificaciones.</p>
                    </div>
                  )}
                </div>
              </div>
              <Link
                onClick={() => setAbrirModalCalificacion(true)}
                showAnchorIcon
                className="cursor-pointer hover:underline text-black flex justify-center"
              >
                Calificaciones y opiniones
              </Link>
            </>
          )}
          <div className=" grid grid-cols-2 gap-2 ">
            {user.pk_cedula_user === localUser.pk_cedula_user && (
              <Button
                className="mt-2 py-2 bg-[#39A800] text-white font-semibold rounded-md"
                onClick={() => {
                  handleToggle("update");
                  setIdUser(user);
                }}
              >
                Editar perfil
              </Button>
            )}
            {user.pk_cedula_user === localUser.pk_cedula_user && (
              <Button
                className="py-2 px-4 bg-[#39A800] text-white font-semibold rounded-md mt-2"
                onClick={() => {
                  setAbrirModalPassword(true);
                  setIdUser(user);
                }}
              >
                Cambiar contraseña
              </Button>
            )}
          </div>
        </div>
      </div>
      <FormCalificaion
        open={abrirModalCalificacion}
        onClose={() => setAbrirModalCalificacion(false)}
        fk_user={user.pk_cedula_user}
        title={"Calificaciones de usuario"}
        titleBtn={"Registrar calificación"}
      />
      {user.rol_user !== "admin" && (
        <>
          <div className="grow border-b border-gray-400 my-4"></div>
          <div className="flex w-full flex-col items-center">
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
                  Subastas Creadas. ({totalDeSubastas ? totalDeSubastas : ""})
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
                Subastas Ganadas. ({totalDeSubastasGanadas})
              </button>
            </div>
            <div className="flex w-full flex-col items-center">
              {user.rol_user !== "comprador" && activeTab === "creadas" && (
                <div>
                  <div
                    className={`grid ${
                      subastaForuser
                        ? "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 sm:grid-cols-1 mb-10"
                        : ""
                    } justify-center`}
                  >
                    {subastaForuser ? (
                      subastaForuser.map((subasta) => (
                        <Card
                          key={subasta.pk_id_sub}
                          className="max-w-[340px] m-2"
                        >
                          <CardBody className="items-center w-full h-[510px]">
                            <span className="text-center flex justify-center items-center gap-x-3">
                              <b className="text-lg"> {subasta.pk_id_sub} - {subasta.nombre_tipo_vari} </b>
                              <p className={`text-sm py-1 rounded-lg px-2 capitalize 
                                ${ subasta.estado_sub === "abierta" ? "bg-[#d1f4e0] text-[#14a150]" : "" }
                                ${ subasta.estado_sub === "proceso" ? "bg-orange-100 text-orange-500" : "" }
                                ${ subasta.estado_sub === "espera" ? "bg-blue-100 text-blue-500" : "" }
                                ${ subasta.estado_sub === "cerrada" ? "bg-[#fdd0df] text-[#f31263]" : "" }  `}
                              >
                                {subasta.estado_sub}
                              </p>
                            </span>
                            <CardBody className="flex items-center">
                              <Image
                                shadow="sm"
                                radius="md"
                                alt={subasta.imagen_sub}
                                className="w-[250px] object-cover h-[200px]"
                                src={`http://localhost:4000/subastas/${subasta.imagen_sub}`}
                              />
                              <div className="grid gap-x-2 py-2 px-2 text-sm h-[430px] overflow-y-auto">
                                <div className="flex flex-col">
                                  <div className="flex w-full gap-x-2">
                                    <p className="font-semibold">Apertura:</p>
                                    <p>
                                      {new Date(
                                        subasta.fecha_inicio_sub
                                      ).toLocaleString("es-ES", {
                                        year: "numeric", month: "numeric",
                                        day: "numeric", hour: "numeric",
                                        minute: "numeric", second: "numeric",
                                      })}
                                    </p>
                                  </div>
                                  <div className="flex w-full gap-x-2">
                                    <p className="font-semibold">Cierre:</p>
                                    <p>
                                      {new Date(
                                        subasta.fecha_fin_sub
                                      ).toLocaleString("es-ES", {
                                        year: "numeric", month: "numeric",
                                        day: "numeric", hour: "numeric",
                                        minute: "numeric", second: "numeric",
                                      })}
                                    </p>
                                  </div>
                                  <div className="flex w-full gap-x-2">
                                    <p className="font-semibold">Ubicación:</p>
                                    <p> {subasta.nombre_vere} - {subasta.nombre_muni} - {subasta.nombre_depar} </p>
                                  </div>
                                  <div className="flex w-full gap-x-2">
                                    <p className="font-semibold">Cantidad:</p>
                                    <p>{subasta.cantidad_sub} {subasta.cantidad_sub > 0 ? subasta.unidad_peso_sub + "s" : subasta.unidad_peso_sub}</p>
                                  </div>
                                  <div className="flex w-full gap-x-2">
                                    <p className="font-semibold">Certificado:</p>
                                    <div
                                      className="scroll-container"
                                      onMouseEnter={() => handleMouseEnter(subasta.pk_id_sub,"certificado")}
                                      onMouseLeave={() => handleMouseLeave(subasta.pk_id_sub,"certificado")}
                                    >
                                      <p className={`cursor-pointer hover:underline scroll-text ${
                                        hoveredLinks[ `${subasta.pk_id_sub}_certificado` ] ? "scroll-active" : "" }`}
                                      >
                                        <a
                                          href={`http://localhost:4000/subastas/${subasta.certificado_sub}`}
                                          download={subasta.certificado_sub}
                                        >
                                          {subasta.certificado_sub}
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex w-full gap-x-2">
                                    <p className="font-semibold"> Tipo Variedad: </p>
                                    <p>{subasta.nombre_tipo_vari}</p>
                                  </div>
                                  <div className="flex gap-x-2">
                                    <p className="font-semibold"> Descripción: </p>
                                    <div
                                      className="scroll-container"
                                      onMouseEnter={() => handleMouseEnter( subasta.pk_id_sub, "descripcion" ) }
                                      onMouseLeave={() => handleMouseLeave( subasta.pk_id_sub, "descripcion" ) }
                                    >
                                      <p className={`scroll-text ${
                                        hoveredLinks[ `${subasta.pk_id_sub}_descripcion` ] ? "scroll-active" : "" }`}
                                      >
                                        {subasta.descripcion_sub}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-x-2">
                                    <p className="font-semibold"> Precio base:</p>
                                    <p> ${Number(subasta.precio_inicial_sub).toLocaleString("es-ES")}</p>
                                  </div>
                                  {subasta.estado_sub === "cerrada" ? (
                                    <>
                                      <div className="flex gap-x-2">
                                        <p className="font-semibold text-[#c29b81]">Precio Final:</p>
                                        <p className="text-[#009100] font-semibold">${Number(subasta.precio_final_sub).toLocaleString("es-ES")}</p>
                                      </div>
                                      <div className="flex gap-x-2">
                                        <p className="font-semibold text-[#c29b81]">Vendedor:</p>
                                        <p
                                          className="text-[#009100] font-semibold cursor-pointer"
                                          onClick={() => navigate(`/profile/${subasta.ganador_sub}`)}
                                        >
                                          {subasta.ganador_sub ? subasta.ganador_nombre : "Desconocido"}
                                        </p>
                                      </div>
                                    </>
                                  ) : (
                                    <Button
                                      className="flex rounded-md p-2 cursor-pointer text-[#39A800] border-solid border-2 border-[#39A800]  text-sm items-center gap-x-3 hover:bg-[#39A800] hover:text-[#FDFBF6] bg-white"
                                      size="lg"
                                      onClick={() =>
                                        handdleModaSub(subasta.pk_id_sub)
                                      }
                                    >
                                      Ver subasta
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardBody>
                          </CardBody>
                        </Card>
                      ))
                    ) : (
                      <div className="flex">
                        <p className="pl-4 text-xl my-2 text-gray-400 font-semibold">No tiene ninguna subasta creada.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeTab === "ganadas" && (
                <div
                  className={`grid ${
                    activeTab
                      ? "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 sm:grid-cols-1 mb-10"
                      : ""
                  } justify-center`}
                >
                  {subastaGanador && subastaGanador.length > 0 ? (
                    subastaGanador.map((ganador) => (
                      <Card
                        key={ganador.pk_id_sub}
                        className="max-w-[340px] max-h-[530px] p-2 mb-3"
                      >
                        <CardBody className="w-full">
                          <span className="text-center flex justify-center items-end gap-x-3">
                            <b className="text-lg">
                              {ganador.pk_id_sub} - {ganador.nombre_tipo_vari}
                            </b>
                            <p className={`text-sm py-1 rounded-lg px-2 capitalize 
                              ${ganador.estado_sub === "abierta"? "bg-[#d1f4e0] text-[#14a150]": ""}
                              ${ganador.estado_sub === "proceso"? "bg-orange-100 text-orange-500": ""}
                              ${ganador.estado_sub === "espera"? "bg-blue-100 text-blue-500": ""}
                              ${ganador.estado_sub === "cerrada"? "bg-[#fdd0df] text-[#f31263]": ""} `}
                            >
                              {ganador.estado_sub}
                            </p>
                          </span>
                          <CardBody className="flex items-center">
                            <Image
                              shadow="sm"
                              radius="md"
                              alt={ganador.imagen_sub}
                              className="w-[250px] object-cover h-[200px]"
                              src={`http://localhost:4000/subastas/${ganador.imagen_sub}`}
                            />
                            <div className="grid gap-x-2 pt-2 px-2 text-sm max-h-[400px] overflow-y-auto">
                              <div className="flex flex-col">
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Apertura:</p>
                                  <p>
                                    {new Date(
                                      ganador.fecha_inicio_sub
                                    ).toLocaleString("es-ES", {
                                      year: "numeric", month: "numeric",
                                      day: "numeric", hour: "numeric",
                                      minute: "numeric", second: "numeric",
                                    })}
                                  </p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Cierre:</p>
                                  <p>
                                    {new Date(
                                      ganador.fecha_fin_sub
                                    ).toLocaleString("es-ES", {
                                      year: "numeric", month: "numeric",
                                      day: "numeric", hour: "numeric",
                                      minute: "numeric", second: "numeric",
                                    })}
                                  </p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Ubicación:</p>
                                  <p>{ganador.nombre_vere} - {ganador.nombre_muni}{" "} - {ganador.nombre_depar}</p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Cantidad:</p>
                                  <p>
                                    {ganador.cantidad_sub}
                                    {ganador.cantidad_sub > 0
                                      ? ganador.unidad_peso_sub + "s"
                                      : ganador.unidad_peso_sub}
                                  </p>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Certificado:</p>
                                  <div
                                    className="scroll-container"
                                    onMouseEnter={() =>handleMouseEnter(ganador.pk_id_sub,"certificado")}
                                    onMouseLeave={() =>handleMouseLeave(ganador.pk_id_sub,"certificado")}
                                  >
                                    <p className={`cursor-pointer hover:underline scroll-text ${
                                      hoveredLinks[ `${ganador.pk_id_sub}_certificado` ] ? "scroll-active" : "" }`}
                                    >
                                      <a
                                        href={`http://localhost:4000/subastas/${ganador.certificado_sub}`}
                                        download={ganador.certificado_sub}
                                      >
                                        {ganador.certificado_sub}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex w-full gap-x-2">
                                  <p className="font-semibold">Tipo Variedad:</p>
                                  <p>{ganador.nombre_tipo_vari}</p>
                                </div>
                                <div className="flex gap-x-2">
                                  <p className="font-semibold">Descripción:</p>
                                  <div
                                    className="scroll-container"
                                    onMouseEnter={() => handleMouseEnter( ganador.pk_id_sub, "descripcion" ) }
                                    onMouseLeave={() => handleMouseLeave( ganador.pk_id_sub, "descripcion" ) }
                                  >
                                    <p className={`scroll-text ${
                                      hoveredLinks[ `${ganador.pk_id_sub}_descripcion` ] ? "scroll-active" : "" }`}
                                    >
                                      {ganador.descripcion_sub}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-x-2">
                                  <p className="font-semibold">Precio base:</p>
                                  <p>${Number(ganador.precio_inicial_sub).toLocaleString("es-ES")}</p>
                                </div>
                                {ganador.estado_sub === "cerrada" && (
                                  <>
                                    <div className="flex gap-x-2">
                                      <p className="font-semibold text-[#c29b81]">Precio Final:</p>
                                      <p className="text-[#009100] font-semibold">${Number(ganador.precio_final_sub).toLocaleString("es-ES")}</p>
                                    </div>
                                    <div className="flex gap-x-2">
                                      <p className="font-semibold text-[#c29b81]">Vendedor:</p>
                                      <p
                                        className="text-[#009100] font-semibold cursor-pointer"
                                        onClick={() => navigate( `/profile/${ganador.propietario_cedula}` ) }
                                      > 
                                        {ganador.propietario_nombre ? ganador.propietario_nombre : "Desconocido"} 
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardBody>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <div className="flex">
                      <p className="pl-4 text-xl my-2 text-gray-400 font-semibold">No tiene ninguna subasta ganada.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileUser;
