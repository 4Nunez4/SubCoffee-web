import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { PlusIcon } from "../../nextui/PlusIcon";
import { EditIcon } from "../../nextui/EditIcon";
import { useSubastaContext } from "../../context/SubastaContext";
import DesactivarIcon from "../../nextui/DesactivarIcon";
import ActivarIcon from "../../nextui/ActivarIcon";
import FormSubasta from "../templates/FormSubasta";
import { useNavigate } from "react-router-dom";
import ModalSubCoffee from "../templates/ModalSubCoffee";

export default function SubastaTable() {
  const navigate = useNavigate();
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalSub, setAbrirModalSub] = useState(false)
  const [mode, setMode] = useState("create");

  const { getSubForUser, subastaForuser, desactivarSubs, activarSubs, setIdSubasta } = useSubastaContext();
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getSubForUser(usuario.pk_cedula_user);
  }, []);

  const handleToggle = (mode) => {
    setAbrirModal(true);
    setMode(mode);
  };

  const handdleModaSub = (id) => {
    setAbrirModalSub(true)
    setIdSubasta(id)
  }

  return (
    <div className="w-full">
        <div className="flex justify-between py-4 gap-x-3 px-12 items-center">
        <p className="text-center  text-lg"> Registra una subasta con tu café de alta calidad </p>
        <Button
          className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#00ed64] hover:text-[#001e2b] transition-all ease-in-out duration-500"
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
      {subastaForuser ? (
        <div className="grid grid-cols-3 justify-center items-center gap-4 p-3">
          {subastaForuser.map((subasta) => (
            <Card key={subasta.pk_id_sub} className="max-w-[410px] bg-[#001e2b] text-white">
              <CardBody className="items-center">
                <span className="text-center flex items-center justify-center w-full gap-3">
                  {subasta.pk_id_sub} - {subasta.nombre_tipo_vari}
                  <div className={`w-auto rounded-lg border
                      ${subasta.estado_sub === "abierta"? "bg-green-500 border-green-600 text-green-50": ""}
                      ${subasta.estado_sub === "proceso"? "bg-orange-500 border-orange-600 text-orange-50": ""}
                      ${subasta.estado_sub === "espera"? "bg-blue-500 border-blue-600 text-blue-50": ""}
                      ${subasta.estado_sub === "cerrada"? "bg-red-400 border-red-600 text-red-50": ""} 
                    `}
                  >
                    <p className="text-sm text-default-50 p-1">{subasta.estado_sub}</p>
                  </div>
                  {subasta.pk_cedula_user === usuario.pk_cedula_user && (
                    <Button
                      className="bg-gray-400"
                      radius="md"
                      startContent={<EditIcon />}
                      onPress={() => {handleToggle("update"); setIdSubasta(subasta)}}
                    >
                      Editar
                    </Button>
                  )}
                </span>
                <CardBody className="flex items-center ">
                  <div className="w-64">
                    <Image
                      shadow="sm"
                      radius="md"
                      alt={subasta.imagen_sub}
                      className="w-[253px] object-cover h-[200px]"
                      src={`http://localhost:4000/img/subasta/${subasta.imagen_sub}`}
                      />
                  </div>
                  <div className="grid gap-x-2 py-2 px-2 text-sm">
                    <div className="flex flex-col">
                      <div className="flex w-full gap-x-2">
                        <p className="font-semibold">Apertura:</p>
                        <p>{new Date(subasta.fecha_inicio_sub).toLocaleString("es-ES", {year: "numeric",month: "numeric",day: "numeric",hour: "numeric",minute: "numeric",second: "numeric",})}</p>
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
                        <p>{subasta.cantidad_sub} {subasta.cantidad_sub > 1 ? subasta.unidad_peso_sub + "s" : subasta.unidad_peso_sub}</p>
                      </div>
                      <div className="flex w-full gap-x-2">
                        <p className="font-semibold">Tipo Variedad:</p>
                        <p>{subasta.nombre_tipo_vari}</p>
                      </div>
                      <div className="flex w-full gap-x-2">
                        <p className="font-semibold">Certificado:</p>
                        <p className="underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">{subasta.certificado_sub}</p>
                      </div>
                      <div className="flex gap-x-2">
                        <p className="font-semibold">Precio base:</p>
                        <p>${Number(subasta.precio_inicial_sub).toLocaleString("es-ES")}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="flex justify-center gap-x-2 -mt-4">
                  <Button
                    className="bg-gray-400"
                    radius="md"
                    onClick={() => handdleModaSub(subasta.pk_id_sub)}
                  >
                    Visualizar
                  </Button>
                  {subasta.estado_sub === "abierta" ? (
                    <Button
                      className="bg-red-600 text-white w-full"
                      startContent={<DesactivarIcon />}
                      onClick={() => desactivarSubs(subasta.pk_id_sub, usuario.pk_cedula_user) }
                    >
                      Desactivar Subasta
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 text-white px-[27px] w-full"
                      startContent={<ActivarIcon />}
                      onClick={() => activarSubs(subasta.pk_id_sub, usuario.pk_cedula_user) }
                    >
                      Activar Subasta
                    </Button>
                  )}
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
