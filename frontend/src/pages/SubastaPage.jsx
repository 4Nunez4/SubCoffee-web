import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../components/molecules/ImageSlider";
import { useSubastaContext } from "../context/SubastaContext";
import ModalSubCoffee from "../components/templates/ModalSubCoffee";
import { useAuthContext } from "../context/AuthContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SubastaPage() {
  const navigate = useNavigate();
  const { getSubsMenoCerradas, subastasActivas, setIdSubasta } = useSubastaContext();
  const { getUsers } = useAuthContext();
  const [abrirModal, setAbrirModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0); // Índice de la primera subasta visible
  const users = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getSubsMenoCerradas();
    getUsers();
  }, []);

  const handdleModaSub = (id) => {
    setAbrirModal(true);
    setIdSubasta(id);
  };

  useEffect(() => {
    if (users.rol_user === "admin") navigate('/users');
  }, [users, navigate]);

  const showNextSubastas = () => {
    setStartIndex(startIndex + 1);
  };

  const showPrevSubastas = () => {
    setStartIndex(startIndex - 1);
  };

  return (
    <div className="pb-8">
      <ImageSlider />
      {users.rol_user !== "admin" && (
        <div className="pl-6">
          <p className="pl-4 text-2xl text-[#a1653d] text-center">Subastas</p>
          <div className="flex flex-col overflow-x-auto py-6 overflow-hidden">
            {subastasActivas.length > 0 ? (
              <div className="flex flex-wrap">
                {subastasActivas.slice(startIndex, startIndex + 3).map((subasta) => (
                  <Card key={subasta.pk_id_sub} className="max-w-[380px] h-[540px] p-2 mr-4 mb-4 shadow-small">
                    <CardHeader className="justify-between">
                      <div className="flex gap-x-3">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={
                            subasta.imagen_user && subasta.imagen_user.length > 0
                              ? `http://localhost:4000/usuarios/${subasta.imagen_user}`
                              : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
                          }
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600"> {subasta.nombre_user} </h4>
                          <h5 className="text-small -mt-1 tracking-tight text-default-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-auto"> @{subasta.email_user} </h5>
                        </div>
                      </div>
                      <Button
                        className="bg-gray-100 text-foreground border-default-200"
                        radius="md"
                        variant="bordered"
                        size="sm"
                        onPress={() => navigate(`/profile/${subasta.pk_cedula_user}`)}
                      >
                        Visualizar perfil
                      </Button>
                    </CardHeader>
                    <CardBody className="items-start w-full -mt-3">
                      <span className="flex justify-center items-center gap-x-3">
                        <b className="ml-5"> {subasta.pk_id_sub} - {subasta.nombre_tipo_vari} </b>
                        <div className={`rounded-lg border
                          ${subasta.estado_sub === "abierta" ? "bg-green-500 border-green-600 text-green-50" : ""}
                          ${subasta.estado_sub === "proceso" ? "bg-orange-500 border-orange-600 text-orange-50" : ""}
                          ${subasta.estado_sub === "espera" ? "bg-blue-500 border-blue-600 text-blue-50" : ""}
                          ${subasta.estado_sub === "cerrada" ? "bg-red-400 border-red-600 text-red-50" : ""}  `}
                        >
                          <p className="text-sm text-default-50 p-0 px-1"> {subasta.estado_sub} </p>
                        </div>
                      </span>
                      <CardBody className="flex">
                        <Image
                          shadow="sm"
                          radius="md"
                          alt={subasta.imagen_sub}
                          className="w-[300px] object-cover h-[200px]"
                          src={`http://localhost:4000/subastas/${subasta.imagen_sub}`}
                        />
                        <div className="grid gap-x-2 py-2 px-2 text-sm">
                          <div className="flex flex-col">
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Apertura:</p>
                              <p> {new Date( subasta.fecha_inicio_sub ).toLocaleString("es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })} </p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Cierre:</p>
                              <p> {new Date(subasta.fecha_fin_sub).toLocaleString( "es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", } )} </p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Ubicación:</p>
                              <p> {subasta.nombre_vere} - {subasta.nombre_muni} - {subasta.nombre_depar} </p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Cantidad:</p>
                              <p> {subasta.cantidad_sub} {subasta.cantidad_sub > 1 ? subasta.unidad_peso_sub + "s" : subasta.unidad_peso_sub} </p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Tipo Variedad:</p>
                              <p>{subasta.nombre_tipo_vari}</p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Certificado:</p>
                              <a href={`http://localhost:4000/subastas/${subasta.certificado_sub}`} download={subasta.certificado_sub} className="underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap w-52">
                                {subasta.certificado_sub}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2">
                          <Button
                            className="py-2 px-4 bg-[#00684a] text-white font-semibold rounded-lg"
                            size="lg"
                            onClick={() => handdleModaSub(subasta.pk_id_sub)}
                          >
                            Ver subasta
                          </Button>
                        </div>
                      </CardBody>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex">
                <p className="pl-4 text-xl my-2 text-gray-500 font-semibold">No hay subastas disponibles.</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              {startIndex > 0 && (
                <button className="bg-gray-300 px-3 py-1 mr-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-400" onClick={showPrevSubastas}>
                  Anterior
                </button>
              )}
              {(startIndex + 4) < subastasActivas.length && (
                <button className="bg-gray-300 px-3 py-1 ml-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-400" onClick={showNextSubastas}>
                  Siguiente
                </button>
              )}
            </div>
          </div>
          <ModalSubCoffee
            open={abrirModal}
            onClose={() => setAbrirModal(false)}
          />
        </div>
      )}
    </div>
  );
  
}


export default SubastaPage;
