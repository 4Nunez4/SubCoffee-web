import React, { useEffect, useContext, useState } from "react";
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

function SubastaPage() {
  const navigate = useNavigate();
  const { getSubs, subastas, setIdSubasta } = useSubastaContext();
  const users = JSON.parse(localStorage.getItem("user"));
  const [abrirModal, setAbrirModal] = useState(false)

  useEffect(() => {
    getSubs();
  }, []);

  const handdleModaSub = (id) => {
    setAbrirModal(true)
    setIdSubasta(id)
  }

  return (
    <div className="px-10">
      {users.rol_user !== "admin" ? (
        <>
          <ImageSlider />
          <p className="pl-4 text-xl">Subastas</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 justify-center items-center gap-4 p-3">
            {subastas &&
              subastas.map((subasta) => (
                <Card key={subasta.pk_id_sub} className="max-w-[500px] p-2">
                  <CardHeader className="justify-between">
                    <div className="flex gap-3">
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
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {subasta.nombre_user}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                          @{subasta.email_user}
                        </h5>
                      </div>
                    </div>
                    <Button
                      className="bg-gray-100 text-foreground border-default-200"
                      radius="md"
                      variant="bordered"
                      size="sm"
                      onPress={() => navigate(`/profile/${subasta.pk_cedula_user}`) }
                    >
                      Visualizar perfil
                    </Button>
                  </CardHeader>
                  <CardBody className="items-center w-full">
                    <span className="text-center flex justify-center items-center gap-x-3">
                      <b className="text-lg">
                        {subasta.pk_id_sub} - {subasta.nombre_tipo_vari}
                      </b>
                      <div
                        className={`w-auto rounded-lg ${
                          subasta.estado_sub === "abierta"
                            ? "bg-green-400"
                            : "bg-red-400"
                        } border ${
                          subasta.estado_sub === "abierta"
                            ? "border-green-600"
                            : "border-red-600"
                        }`}
                      >
                        <p
                          className={`text-sm text-default-400 p-1 ${
                            subasta.estado_sub === "abierta"
                              ? "text-green-50"
                              : "text-red-50"
                          }`}
                        >
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
                      <div className="flex flex-col gap-1 pt-4">
                        <div className="text-gray-400 text-sm justify-between">
                          <p>
                            Cantidad: {subasta.cantidad_sub} - {subasta.cantidad_sub > 1 && subasta.unidad_peso_sub + "s"}
                          </p>
                          <p>Precio inicial: {subasta.precio_inicial_sub}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            {"Fecha de inicio: "}
                            {new Date(subasta.fecha_inicio_sub).toLocaleString(
                              "es-ES",
                              { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", }
                            )}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {" Fecha fin: "}
                            {new Date(subasta.fecha_fin_sub).toLocaleString(
                              "es-ES",
                              { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", }
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            {subasta.nombre_vere} - {subasta.nombre_muni} - {subasta.nombre_depar}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-center gap-x-4">
                      <Button
                        className="bg-gray-400"
                        radius="md"
                        size="lg"
                        onClick={() => handdleModaSub(subasta.pk_id_sub) }
                      >
                        Visualizar Subasta
                      </Button>
                    </CardFooter>
                  </CardBody>
                </Card>
              ))}
          </div>
          <ModalSubCoffee
            open={abrirModal}
            onClose={() => setAbrirModal(false)}
          />
        </>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center mt-14 gap-y-4 px-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Gestiona usuarios, ubicaciones y variedades de café
          </h1>
        </div>
        <div>
          <img
            src="./image.png"
            alt="Imagen descriptiva"
            className="mx-auto md:mx-0"
          />
        </div>
      </div>
      )}
    </div>
  );
}

export default SubastaPage;
