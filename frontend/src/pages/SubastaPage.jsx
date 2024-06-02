import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../components/molecules/ImageSlider";
import { useSubastaContext } from "../context/SubastaContext";
import ModalSubCoffee from "../components/templates/ModalSubCoffee";
import { useAuthContext } from "../context/AuthContext";

function SubastaPage() {
  const navigate = useNavigate();
  const { getSubs, subastas, setIdSubasta } = useSubastaContext();
  const { getUsers } = useAuthContext()
  const [abrirModal, setAbrirModal] = useState(false)
  const users = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getSubs()
    getUsers()
  }, []);

  const handdleModaSub = (id) => {
    setAbrirModal(true)
    setIdSubasta(id)
  }
  
  useEffect(() => {
    if (users.rol_user === "admin") navigate('/users');
  }, [users, navigate]);

  return (
    <div className="px-auto pb-8 bg-gray-300">
      <ImageSlider />
      {
        users.rol_user !== "admin" && (
          <div className="px-16">
            <p className="pl-4 pb-4 text-[#00684a]  text-2xl font-semibold md:text-2xl  mb-4">Subastas</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 justify-center items-center gap-4">
              {subastas &&
                subastas.map((subasta) => (
                  <Card key={subasta.pk_id_sub} className="max-w-[320px] h-[560px] p-2 bg-[#00684a] text-white  ">
                    <CardHeader className="justify-between">
                      <div className="flex gap-x-3">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={
                            subasta.imagen_user && subasta.imagen_user.length > 0
                              ? `http://localhost:4000/img/${subasta.imagen_user}`
                              : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
                          }
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-white"> {subasta.nombre_user} </h4>
                          <h5 className="text-small -mt-1 tracking-tight text-default-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]"> @{subasta.email_user} </h5>
                        </div>
                      </div>
                      <Button
                        className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#00ed64] hover:text-[#001e2b] transition-all ease-in-out duration-500"
                        radius="md"
                        variant="bordered"
                        size="sm"
                        onPress={() => navigate(`/profile/${subasta.pk_cedula_user}`)}
                      >
                        Visualizar perfil
                      </Button>
                    </CardHeader>
                    <CardBody className="items-start w-full ">
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
                      <CardBody className="flex items-center">
                        <Image
                          shadow="sm"
                          radius="md"
                          alt={subasta.imagen_sub}
                          className="w-[230px] object-cover h-[200px]"
                          src={`http://localhost:4000/img/subasta/${subasta.imagen_sub}`}
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
                              <p className="underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"> {subasta.certificado_sub} </p>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter className="flex justify-center gap-x-4">
                        <button
                          className="border-[#00ed64] inline-flex items-center justify-center py-2 px-4 bg-[#00ed64] text-white  font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#001e2b]  hover:text-[#001e2b] transition-all ease-in-out duration-500"
                          radius="md"
                          size="lg"
                          onClick={() => handdleModaSub(subasta.pk_id_sub)}
                        >
                          Visualizar Subasta
                        </button>
                      </CardFooter>
                    </CardBody>
                  </Card>
                ))}
            </div>
            <ModalSubCoffee
              open={abrirModal}
              onClose={() => setAbrirModal(false)}
            />
          </div>
        )
      }
    </div>
  );
}

export default SubastaPage;
