import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
} from "@nextui-org/react";
import { PlusIcon } from "../../nextui/PlusIcon";
import { EditIcon } from "../../nextui/EditIcon";
import SubastaContext from "../../context/SubastaContext";
import DesactivarIcon from "../../nextui/DesactivarIcon";
import ActivarIcon from "../../nextui/ActivarIcon";
import FormSubasta from "../templates/FormSubasta";
import { useNavigate } from "react-router-dom";

export default function SubastaTable() {
  const navigate = useNavigate();
  const [abrirModal, setAbrirModal] = useState(false);
  const [mode, setMode] = useState("create");

  const {
    getSubForUser,
    subastaForuser,
    desactivarSubs,
    activarSubs,
    setIdSubasta,
  } = useContext(SubastaContext);
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getSubForUser(usuario.pk_cedula_user);
  }, []);

  const handleToggle = (mode) => {
    setAbrirModal(true);
    setMode(mode);
  };

  return (
    <div className="w-full">
      <div className="flex py-4 gap-x-3 items-center">
        <Button
          className="bg-slate-400 text-white"
          endContent={<PlusIcon />}
          onClick={() => {
            handleToggle("create");
          }}
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
      {subastaForuser ? (
        <div className="grid grid-cols-2 justify-center items-center gap-4 p-3">
          {subastaForuser.map((subasta) => (
            <Card key={subasta.pk_id_sub} className="max-w-[500px] p-2">
              <CardHeader className="justify-between">
                <div className="flex gap-3">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={
                      subasta.imagen_user
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
                  onPress={() => navigate(`/profile/${usuario.pk_cedula_user}`)}
                >
                  Visualizar perfil
                </Button>
              </CardHeader>
              <CardBody className=" items-start">
                <span className="w-full text-center">
                  <b className="text-lg">
                    {subasta.nombre_tipo_vari} - {subasta.nombre_fin}
                  </b>
                  <p className="text-sm text-default-400">
                    {subasta.estado_sub}
                  </p>
                </span>
                <CardBody className="flex items-center">
                  <Image
                    shadow="sm"
                    radius="md"
                    alt={subasta.imagen_sub}
                    className="w-[380px] object-cover h-[200px]"
                    src={`http://localhost:4000/img/subasta/${subasta.imagen_sub}`}
                  />
                  <div className="flex flex-col gap-1 pt-4">
                    <div className="text-gray-400 text-sm flex justify-between">
                      <p>
                        Cantidad: {subasta.cantidad_sub} -
                        {subasta.unidad_peso_sub}
                      </p>
                      <p>Precio inicial: {subasta.precio_inicial_sub}</p>
                    </div>
                    <div className="flex">
                      <p className="text-gray-400 text-sm">
                        {"Fecha de inicio "}
                        {new Date(subasta.fecha_inicio_sub).toLocaleString(
                          "es-ES",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {" Fecha fin "}
                        {new Date(subasta.fecha_fin_sub).toLocaleString(
                          "es-ES",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">
                        {subasta.nombre_vere} - {subasta.nombre_muni} -{" "}
                        {subasta.nombre_depar}
                      </p>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="flex justify-center gap-x-4">
                  <Button
                    className="bg-gray-400"
                    radius="md"
                    size="lg"
                    onPress={() => navigate(`/subasta/${subasta.pk_id_sub}`)}
                  >
                    Visualizar
                  </Button>
                  {subasta.estado_sub === "abierta" ? (
                    <Button
                      className="bg-red-600 text-white w-full"
                      startContent={<DesactivarIcon />}
                      onClick={() =>
                        desactivarSubs(
                          subasta.pk_id_sub,
                          usuario.pk_cedula_user
                        )
                      }
                    >
                      Desactivar Subasta
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 text-white px-[27px] w-full"
                      startContent={<ActivarIcon />}
                      onClick={() =>
                        activarSubs(subasta.pk_id_sub, usuario.pk_cedula_user)
                      }
                    >
                      Activar Subasta
                    </Button>
                  )}
                  {subasta.pk_cedula_user === usuario.pk_cedula_user && (
                    <Button
                      className="bg-gray-400"
                      radius="md"
                      size="lg"
                      startContent={<EditIcon />}
                      onPress={() => {
                        handleToggle(subasta);
                        setIdSubasta(subasta);
                      }}
                    >
                      Editar
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
