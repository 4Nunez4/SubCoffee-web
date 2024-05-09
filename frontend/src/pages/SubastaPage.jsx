import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axiosClient from "../api/axios";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { EditIcon } from "../nextui/EditIcon";
import { Link } from "react-router-dom";

function SubastaPage() {
  const slides = [
    {
      url: "https://www.semana.com/resizer/LgNm70jTor0z_IKrwZmx8bvlMEY=/arc-anglerfish-arc2-prod-semana/public/MGSRCROCY5GETHHQC2XBMM2CEQ.jpg",
    },
    {
      url: "https://cdn-3.expansion.mx/dims4/default/3a43bc7/2147483647/strip/true/crop/5760x3840+0+0/resize/1800x1200!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fd3%2Fa1%2Fca36469448dea0b9dde50db5451f%2Fbeneficios-cafe.jpg",
    },
    {
      url: "https://www.solucionesparaladiabetes.com/magazine-diabetes/wp-content/uploads/cafe-696x464.jpeg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const [results, setResults] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axiosClient.get(`/v1/listar`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching dates list:", error);
    }
  };

  const handleUpdateSubasta = (id) => {
    localStorage.setItem("id_sub", id);
    handleUpdateSubasta(id);
  };

  return (
    <div className="px-10 bg-gray-100">
      <div className="max-w-[1600px] h-auto w-full m-auto pt-10 p-4">
        <div
          className="w-full h-96 rounded-2xl bg-center bg-cover duration-500"
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        ></div>
        <div className="flex justify-center">
          <div
            className="text-2xl text-bold rounded-full p-2 text-gray-700 cursor-pointer transition duration-300"
            onClick={prevSlide}
          >
            <FaChevronLeft size={25} />
          </div>
          <div className="flex justify-center items-center my-4 transition duration-300">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
          <div
            className="text-2xl text-bold rounded-full p-2 text-gray-700 cursor-pointer transition duration-300"
            onClick={nextSlide}
          >
            <FaChevronRight size={25} />
          </div>
        </div>
      </div>
      <p className="pl-4 text-xl">Borbon</p>
      <div className="grid grid-cols-3 justify-center items-center gap-4 p-3">
        {results &&
          results.map((subasta) => (
            <Card key={subasta.pk_id_sub} className="max-w-[500px] p-2">
              <CardHeader className="justify-between">
                <div className="flex gap-3">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={subasta.imagen_user}
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
                <Link to={`/profile/${subasta.pk_cedula_user}`}>
                  <Button
                    className="bg-gray-100 text-foreground border-default-200"
                    radius="md"
                    variant="bordered"
                    size="sm"
                    onPress={() => handleUpdateSubasta(subasta.pk_id_sub)}
                  >
                    Visualizar perfil
                  </Button>
                </Link>
              </CardHeader>
              <CardBody className="items-start">
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
                    className="w-[250px] object-cover h-[200px]"
                    src={subasta.imagen_sub}
                  />
                  <div className="flex flex-col gap-1 pt-4">
                    <div className="text-gray-400 text-sm justify-between">
                      <p>
                        Cantidad: {subasta.cantidad_sub} -
                        {subasta.unidad_peso_sub}
                      </p>
                      <p>Precio inicial: {subasta.precio_inicial_sub}</p>
                    </div>
                    <div>
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
                  <Link to={`/subasta/${subasta.pk_id_sub}`}>
                    <Button className="bg-gray-400" radius="md" size="lg">
                      Visualizar Subasta
                    </Button>
                  </Link>
                  {subasta.pk_cedula_user === usuario.pk_cedula_user && (
                    <Button
                      className="bg-gray-400"
                      radius="md"
                      size="lg"
                      startContent={<EditIcon />}
                      onPress={() => handleUpdateSubasta(subasta.pk_id_sub)}
                    >
                      Editar Subasta
                    </Button>
                  )}
                </CardFooter>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default SubastaPage;
