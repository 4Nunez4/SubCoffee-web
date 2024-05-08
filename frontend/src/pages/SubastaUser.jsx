import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axios";
import {
  Card,
  CardHeader,
  CardFooter,
  Avatar,
  Image,
  Button,
  Input,
  CardBody,
} from "@nextui-org/react";

function SubastaUser() {
  const { id } = useParams();
  const [subasta, setSubasta] = useState(null);
  const [oferta, setOferta] = useState("");

  useEffect(() => {
    fetchSubasta();
  }, []);

  const fetchSubasta = async () => {
    try {
      const response = await axiosClient.get(`/v1/buscar/${id}`);
      setSubasta(response.data.data);
    } catch (error) {
      console.error("Error fetching subasta:", error);
    }
  };

  const handleSubmitOferta = async () => {
    // Aquí puedes enviar la oferta al servidor
    console.log("Oferta:", oferta);
  };

  const handleChatClick = () => {
    // Maneja la acción de ir al chat
  };

  const handlePostulantesClick = () => {
    // Maneja la acción de ver los postulantes
  };

  if (!subasta) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">
        Subasta: {subasta.nombre_tipo_vari} - {subasta.nombre_fin}
      </h1>
      <div shadow className="flex gap-3 w-full">
        <div className="bg-gray-200 w-full p-4">
          <div className="flex gap-4">
            <Image
              shadow="sm"
              radius="md"
              alt={subasta.imagen_sub}
              className="object-cover w-[360px] h-[180px]"
              src={subasta.imagen_sub}
            />
            <div className="flex flex-col gap-4">
              <Image
                shadow="sm"
                radius="md"
                alt={subasta.imagen_fin}
                className="object-cover w-[120px] h-[120px]"
                src={subasta.imagen_fin}
              />
              <Image
                shadow="sm"
                radius="md"
                alt={subasta.imagen_vari}
                className="object-cover w-[120px] h-[120px]"
                src={subasta.imagen_vari}
              />
            </div>
          </div>
          <div>
            <p>{subasta.descripcion_sub}</p>
            <p>Precio Inicial: {subasta.precio_inicial_sub}</p>
            <p>Precio Final: {subasta.precio_final_sub}</p>
            <p className="text-gray-700 text-sm">
              Fecha de inicio:{" "}
              {new Date(subasta.fecha_inicio_sub).toLocaleString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
            <p className="text-gray-700 text-sm">
              Fecha de fin:{" "}
              {new Date(subasta.fecha_fin_sub).toLocaleString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="bg-gray-200 p-4 items-center flex flex-col">
          <h3 className="text-lg font-semibold">Usuario</h3>
          <Avatar src={subasta.imagen_user} className="w-24 h-24" />
          <p>{subasta.nombre_user}</p>
          <p>{subasta.email_user}</p>
        </div>
      </div>
      <div shadow className="mt-4 flex w-full bg-gray-100 gap-x-4">
        <div className="bg-gray-200 p-4 w-full">
          <h3 className="text-lg font-semibold">Ofertas</h3>
          <div className="flex items-center gap-x-4">
            <Input
              type="number"
              value={oferta}
              onChange={(e) => setOferta(e.target.value)}
              placeholder="Ingrese su oferta"
            />
            <Button onClick={handleSubmitOferta}>
              Realizar Oferta
            </Button>
          </div>
        </div>
        <div className="bg-gray-200 p-4 flex-col gap-4 flex justify-center">
          <Button className="mr-2 w-full" onClick={handleChatClick}>
            Chat
          </Button>
          <Button onClick={handlePostulantesClick}>Ver Postulantes</Button>
        </div>
      </div>
    </div>
  );
}

export default SubastaUser;
