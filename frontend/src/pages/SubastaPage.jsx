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
import { FaRegCircleUser } from "react-icons/fa6";

function SubastaPage() {
  const navigate = useNavigate();
  const { getSubsMenoCerradas, subastasActivas = [], setIdSubasta, EsperaSubs, activarSubs, desactivarSubs, ProcesoSubs } = useSubastaContext();
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

  useEffect(() => {
    if (!subastasActivas) return;
  
    const handleSubastaState = (subasta) => {
      const { pk_id_sub, precio_final_sub, ganador_sub, fecha_inicio_sub, fecha_fin_sub, estado_sub } = subasta;
      const tiempo = calcularDiferencia(fecha_inicio_sub, fecha_fin_sub);
  
      if (tiempo.includes("Subasta terminada") && !ganador_sub) {
        EsperaSubs(pk_id_sub, users.pk_cedula_user);
      } else if (tiempo.includes("La subasta terminará en: ")) {
        ProcesoSubs(pk_id_sub, users.pk_cedula_user);
      } else if (tiempo.includes("La subasta empezará dentro de") && estado_sub !== "cerrada") {
        activarSubs(pk_id_sub, users.pk_cedula_user);
      } else if (tiempo.includes("A la subasta le quedan ")) {
        EsperaSubs(pk_id_sub, users.pk_cedula_user);
      } else if (tiempo.includes("Subasta terminada") && precio_final_sub !== null && ganador_sub !== null) {
        desactivarSubs(pk_id_sub, users.pk_cedula_user);
      }
    };
    if(subastasActivas.length > 0) {
      subastasActivas.forEach(handleSubastaState);
    }
  
    const intervalId = setInterval(() => {
      subastasActivas.forEach(handleSubastaState);
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [subastasActivas, users]);

  const calcularDiferencia = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const ahora = new Date();

    if (ahora < inicio) {
      return `La subasta empezará dentro de ${calcularTiempoRestante(ahora, inicio)}`;
    } else if (ahora > fin) {
      return "Subasta terminada";
    } else {
      const diferenciaMs = fin - ahora;
      const segundos = Math.floor((diferenciaMs / 1000) % 60);
      const minutos = Math.floor((diferenciaMs / 1000 / 60) % 60);
      const horas = Math.floor((diferenciaMs / 1000 / 60 / 60) % 24);
      const dias = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24);

      if (dias === 0 && horas === 0 && minutos < 10) {
        return `A la subasta le quedan ${minutos} minutos y ${segundos} segundos`;
      } else {
        return `La subasta terminará en: ${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
      }
    }
  };

  const calcularTiempoRestante = (inicio, fin) => {
    const diferenciaMs = fin - inicio;
    const segundos = Math.floor((diferenciaMs / 1000) % 60);
    const minutos = Math.floor((diferenciaMs / 1000 / 60) % 60);
    const horas = Math.floor((diferenciaMs / 1000 / 60 / 60) % 24);
    const dias = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24);
    return `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  };

  return (
    <div className="px-auto pb-8 bg-[#FDFBF6]">
      <ImageSlider />
      {users.rol_user !== "admin" && (
        <div className="pl-6 bg-[#FDFBF6]">
       
          <div className="flex flex-col overflow-x-auto py-6 overflow-hidden">
            {subastasActivas && subastasActivas.length > 0 ? (
              <div className="flex flex-wrap ml-6 gap-x-7">
                {subastasActivas.slice(startIndex, startIndex + 3).map((subasta) => (
                  <Card key={subasta.pk_id_sub} className="max-w-[380px] h-[450px] p-2 bg-[#ffffff] text-[#919190]">
                    <CardHeader className="justify-between">
                      <div className="flex gap-x-3 pl-4">
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
                          <h4 className="text-small font-semibold leading-none text-[#323232]"> {subasta.nombre_user} </h4>
                          <h5 className="text-small -mt-1 tracking-tight text-default-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-full"> @{subasta.email_user} </h5>
                        </div>
                      </div>
                  
                    </CardHeader>
                    <CardBody className="items-start w-full -mt-3">
            
                      <CardBody className="flex">
                      <div className="relative w-auto h-[150px] bg-center bg-no-repeat bg-cover rounded-lg bg-[#181818] bg-opacity-30 inset-0">
                            <img
                              src={`http://localhost:4000/subastas/${subasta.imagen_sub}`}
                              alt=""
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

                            <div className="absolute inset-0 w-11/12 grid grid-cols-2 h-7 mt-2">
                              <b className="ml-5 text-[#ffffff]">
                                {subasta.pk_id_sub} - {subasta.nombre_tipo_vari}
                              </b>

                              <span className=" flex justify-end items-center ">
                                <div
                                  className={`rounded-full w-4 h-4 flex justify-center items-center 
        ${
          subasta.estado_sub === "abierta"
            ?"  border-double border-8 border-green-500"
            : ""
        }
        ${
          subasta.estado_sub === "proceso"
            ? " border-double border-8 border-orange-500"
            : ""
        }
        ${
          subasta.estado_sub === "espera"
            ? " border-double border-8 border-blue-500"
            : ""
        }
        ${
          subasta.estado_sub === "cerrada"
            ? " border-double border-8 border-red-500"
            : ""
        }
    `}
                                >
                                  {/* Ocultamos el texto del estado */}
                                </div>
                              </span>
                            </div>
                          </div>
                        <div className="grid gap-x-2 py-2 px-2 text-sm">
                          <div className="flex flex-col">
                            <div className="flex flex-col items-center mb-1">
                              <p className="text-[#323232] text-sm font-medium text-center">{calcularDiferencia(subasta.fecha_inicio_sub,subasta.fecha_fin_sub)}</p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Apertura:</p>
                              <p> {new Date( subasta.fecha_inicio_sub ).toLocaleString("es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })} </p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Cierre:</p>
                              <p> {new Date(subasta.fecha_fin_sub).toLocaleString( "es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", } )} </p>
                            </div>
                        
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Cantidad:</p>
                              <p> {subasta.cantidad_sub} {subasta.cantidad_sub > 1 ? subasta.unidad_peso_sub + "s" : subasta.unidad_peso_sub} </p>
                            </div>
                            <div className="flex w-full gap-x-2">
                              <p className="font-semibold">Certificado:</p>
                              <a href={`http://localhost:4000/subastas/${subasta.certificado_sub}`} download={subasta.certificado_sub} className="underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap w-52">{subasta.certificado_sub}</a>
                            </div>
                          </div>
                        </div>
                        <div className=" grid grid-cols-5 mt-1">
                            <div className=" col-span-3 flex justify-center ">
                              {" "}
                              <Button
                                className="text-white bg-[#39A800] h-10 w-40 rounded-lg font-bold "
                                onClick={() =>
                                  handdleModaSub(subasta.pk_id_sub)
                                }
                              >
                                Ver Detalles
                              </Button>
                            </div>
                            <div className=" col-span-2 flex justify-center">
                              {" "}
                              <Button
                                className="text-white bg-[#39A800] h-10 w-4  rounded-lg font-bold "
                                onPress={() =>
                                  navigate(`/profile/${subasta.pk_cedula_user}`)
                                }
                              >
                                <FaRegCircleUser className="text-2xl" />
                              </Button>
                            </div>
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
            {
              subastasActivas.length > 0 && (
                <div className="flex justify-between mt-4">
                  <Button auto className="mr-2" onClick={showPrevSubastas} startContent={<FaChevronLeft/>} isDisabled={startIndex <= 0} >
                    Anterior
                  </Button>
                  <Button auto className="ml-2" onClick={showNextSubastas} endContent={<FaChevronRight/>} isDisabled={(startIndex + 3) >= subastasActivas.length} >
                    Siguiente
                  </Button>
                </div>
              )
            }
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