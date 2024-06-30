import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Button, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { PlusIcon } from "../../nextui/PlusIcon";
import { VerticalDotsIcon } from "../../nextui/VerticalDotsIcon";

import { useSubastaContext } from "../../context/SubastaContext";

import FormSubasta from "../templates/FormSubasta";
import ModalSubCoffee from "../templates/ModalSubCoffee";

export default function SubastaTable() {
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalSub, setAbrirModalSub] = useState(false);
  const [mode, setMode] = useState("create");
  const [alertShown, setAlertShown] = useState([]);
  const navigate = useNavigate()

  const { getSubForUser, setIdSubasta, subastaForuser, desactivarSubs, activarSubs, destablecerGanador, ProcesoSubs, EsperaSubs, establecerGanador } = useSubastaContext();
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getSubForUser(usuario.pk_cedula_user);
  }, []);

  const handleToggle = (mode) => {
    setAbrirModal(true);
    setMode(mode);
  };

  const handdleModaSub = (id) => {
    setAbrirModalSub(true);
    setIdSubasta(id);
  }

  useEffect(() => {
    if (!subastaForuser) return;
  
    const handleSubastaState = (subasta) => {
      const { pk_id_sub, nombre_tipo_vari, precio_final_sub, ganador_sub, fecha_inicio_sub, fecha_fin_sub, estado_sub } = subasta;
      const tiempo = calcularDiferencia(fecha_inicio_sub, fecha_fin_sub);
  
      if (tiempo.includes("Subasta terminada") && !alertShown.includes(pk_id_sub) && !ganador_sub) {
        setAlertShown((date) => [...date, pk_id_sub]);
        Swal.fire({
          text: `La subasta ${pk_id_sub} - ${nombre_tipo_vari} ya finalizó. Ingresa a la subasta y escoge al mayor pujador.`,
          icon: "info",
        });
        EsperaSubs(pk_id_sub, usuario.pk_cedula_user);
      } else if (tiempo.includes("La subasta empezará dentro de") && estado_sub !== "cerrada") {
        activarSubs(pk_id_sub, usuario.pk_cedula_user);
      } else if (tiempo.includes("La subasta terminará en")) {
        ProcesoSubs(pk_id_sub, usuario.pk_cedula_user);
      } else if (tiempo.includes("A la subasta le quedan menos de 10 minutos") && !alertShown.includes(pk_id_sub)) {
        setAlertShown((date) => [...date, pk_id_sub]);
        Swal.fire({
          text: `A la subasta ${pk_id_sub} - ${nombre_tipo_vari} le quedan menos de 10 minutos para finalizar. Es hora de ponerse en contacto con el dueño de la mayor puja.`,
          icon: "info",
        });
        EsperaSubs(pk_id_sub, usuario.pk_cedula_user);
      } else if (tiempo.includes("Subasta terminada") && precio_final_sub !== null && ganador_sub !== null) {
        desactivarSubs(pk_id_sub, usuario.pk_cedula_user);
      }
    };
  
    subastaForuser.forEach(handleSubastaState);
  
    const intervalId = setInterval(() => {
      subastaForuser.forEach(handleSubastaState);
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [subastaForuser, alertShown, usuario]);

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

  const confirmDesactivarSubasta = (subasta) => {
    const { pk_id_sub, nombre_tipo_vari } = subasta;
    const data = {
      "precio_final_sub": 0, 
      "ganador_sub": 0
    }

    Swal.fire({
      text: `¿Desea desactivar la subasta ${pk_id_sub} - ${nombre_tipo_vari}? Se establecerá un precio final de 0 y ningún ganador.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        establecerGanador(pk_id_sub, data);
        desactivarSubs(pk_id_sub, usuario.pk_cedula_user);
      }
    });
  };

  return (
    <div className="w-full rounded-lg">
      <div className="grid lg:grid-cols-2 py-4 items-center">
        <p className="text-center font-bold text-lg">Registra una subasta con tu café de alta calidad</p>
        <Button
          className="bg-[#39A800] text-white mx-auto"
          endContent={<PlusIcon />}
          onClick={() => handleToggle("create")}
        >
          Registrar Subasta
        </Button>
      </div>
      <FormSubasta
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        title={mode === "create" ? "Registrar Subasta" : "Actualizar Subasta"}
        titleBtn={mode === "create" ? "Registrar" : "Actualizar"}
        mode={mode}
      />
      <ModalSubCoffee
        open={abrirModalSub}
        onClose={() => setAbrirModalSub(false)}
      />
      {subastaForuser && subastaForuser.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-4 gap-y-3 justify-items-center w-full">
          {subastaForuser.map((subasta) => (
            <Card key={subasta.pk_id_sub} className="w-[320px] h-[548px]">
              <CardBody>
                <span className="text-center flex items-center justify-center w-full gap-3">
                  {subasta.pk_id_sub} - {subasta.nombre_tipo_vari}
                    <p className={`text-sm py-1 rounded-lg px-2 capitalize 
                      ${subasta.estado_sub === "abierta"? "bg-[#d1f4e0] text-[#14a150]": ""}
                      ${subasta.estado_sub === "proceso"? "bg-orange-100 text-orange-500": ""}
                      ${subasta.estado_sub === "espera"? "bg-blue-100 text-blue-500": ""}
                      ${subasta.estado_sub === "cerrada"? "bg-[#fdd0df] text-[#f31263]": ""} 
                    `}>
                      {subasta.estado_sub}
                    </p>
                  {subasta.pk_cedula_user === usuario.pk_cedula_user && (
                      <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                          <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                              <VerticalDotsIcon className="text-default-400" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Example" disabledKeys={subasta.estado_sub === "abierta" ? [] : subasta.estado_sub === "cerrada" && (subasta.ganador_sub || subasta.precio_final_sub)? ["activar", "edit"]: ["edit", "desactivar"]}>
                            <DropdownItem key="edit" onPress={() => {
                              handleToggle("update");
                              setIdSubasta(subasta);
                            }}>
                              Editar
                            </DropdownItem>
                            {subasta.estado_sub !== "cerrada" ? (
                                <DropdownItem key="desactivar" className="text-danger" color="danger" variant="solid" onPress={() => confirmDesactivarSubasta(subasta)}>Desactivar Subasta</DropdownItem>                             
                              ): (
                                <DropdownItem key="activar" className="text-green-500" color="success" variant="solid" onPress={() => destablecerGanador(subasta.pk_id_sub, usuario.pk_cedula_user)}>Activar Subasta</DropdownItem>                             
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                  )}
                </span>
                <CardBody className="flex items-center">
                  <Image
                    shadow="sm"
                    radius="md"
                    alt={subasta.imagen_sub}
                    className="w-[250px] object-cover h-[200px]"
                    src={`http://localhost:4000/subastas/${subasta.imagen_sub}`}
                  />
                  <div className="grid gap-x-2 py-2 px-2 text-sm max-h-[300px] overflow-y-auto">
                    <div className="flex flex-col">
                      <div className="flex flex-col items-center mb-1">
                        <p className="text-[#a1653d]">{calcularDiferencia(subasta.fecha_inicio_sub,subasta.fecha_fin_sub)}</p>
                      </div>
                      <div className="flex w-full gap-x-2">
                        <p className="font-semibold">Apertura:</p>
                        <p>{new Date(subasta.fecha_inicio_sub).toLocaleString("es-ES",{year: "numeric",month: "numeric",day: "numeric",hour: "numeric",minute: "numeric",second: "numeric",})}</p>
                      </div>
                      <div className="flex w-full gap-x-2">
                        <p className="font-semibold">Cierre:</p>
                        <p>{new Date(subasta.fecha_fin_sub).toLocaleString("es-ES",{year: "numeric",month: "numeric",day: "numeric",hour: "numeric",minute: "numeric",second: "numeric",})}</p>
                      </div>
                      <div className="flex w-full gap-x-2">
                        <p className="font-semibold">Ubicación:</p>
                        <p>{subasta.nombre_vere} - {subasta.nombre_muni} - {subasta.nombre_depar}</p>
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
                        <a href={`http://localhost:4000/subastas/${subasta.certificado_sub}`} download={subasta.certificado_sub} className="underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap w-36">
                          {subasta.certificado_sub}
                        </a>
                      </div>
                      <div className="flex gap-x-2">
                        <p className="font-semibold">Precio base:</p>
                        <p>${Number(subasta.precio_inicial_sub).toLocaleString("es-ES")}</p>
                      </div>
                      {subasta.estado_sub === "cerrada" && (
                        <>
                          <div className="flex gap-x-2">
                            <p className="font-semibold text-[#c29b81]">Precio Final:</p>
                            <p className="text-[#009100] font-semibold">${Number(subasta.precio_final_sub).toLocaleString("es-ES")}</p>
                          </div>
                          <div className="flex gap-x-2">
                            <p className="font-semibold text-[#c29b81]">Vendedor:</p>
                            <p className="text-[#009100] font-semibold cursor-pointer" onClick={() => navigate(`/profile/${subasta.ganador_cedula}`)}>{subasta.ganador_nombre ? subasta.ganador_nombre : "Desconocido"}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="flex justify-center gap-x-2 -mt-4">
                  <Button
                    className="py-2 px-4 bg-[#39A800] text-white font-semibold rounded-md"
                    radius="md"
                    isDisabled={subasta.estado_sub === "inactiva" ? "disabled"  : ""}
                    onClick={() => handdleModaSub(subasta.pk_id_sub)}
                  >
                    Visualizar
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex">
          <p className="pl-4 text-xl my-2 text-gray-400 font-semibold">No tienes ninguna subasta creada.</p>
        </div>
      )}
    </div>
  );
}
