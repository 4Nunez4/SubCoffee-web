import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Image, Button, Input } from "@nextui-org/react";
import { useSubastaContext } from "../context/SubastaContext";
import EstrellaLlena from "../nextui/EstrellaLlena";
import EstrellaMediaLlena from "../nextui/EstrellaMediaLlena";
import EstrellaVacia from "../nextui/EstrellaVacia";
import { usePostulantesContext } from "../context/PostulantesContext";

function SubastaUser() {
  const { id } = useParams();
  const [oferta, setOferta] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState("");
  const { getSub, subasta } = useSubastaContext();
  const { getPostsActivos, postsActivos, desactivarPosts } = usePostulantesContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const diferencia = calcularDiferencia(subasta.fecha_fin_sub);
      setTiempoRestante(diferencia);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [subasta.fecha_fin_sub]);

  useEffect(() => {
    getSub(id);
    getPostsActivos(id);
  }, []);

  const calcularDiferencia = (fechaFin) => {
    const fin = new Date(fechaFin);
    const ahora = new Date();

    const diferenciaMs = fin - ahora;
    if (diferenciaMs <= 0) return "Subasta terminada";

    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenciaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaMs % (1000 * 60)) / 1000);

    return `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  };

  const handleSubmitOferta = async () => {
    console.log("Oferta:", oferta);
  };

  const handlePostulantesClick = async () => {
    try {
      const data = {
        fk_id_usuario: user.pk_cedula_user,
        fk_id_subasta: subasta.pk_id_sub,
      };
      await desactivarPosts(data, id);
      console.log("Postulante desactivado");
      navigate(`/subcoffee`);
    } catch (error) {
      console.error("Error al desactivar la postulación:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <p className="font-bold p-1 text-xl items-center flex">
        {subasta.pk_id_sub} - {subasta.nombre_tipo_vari}
        <span className="text-xs mx-4 p-1 rounded-lg bg-[#009100] text-[#e0e0e0]">
          {subasta.estado_sub}
        </span>
      </p>
      <div className="flex gap-3 w-full">
        <div className="bg-[#e0e0e0] rounded-xl w-full p-4">
          <div className="grid gap-1">
            <div className="flex flex-col gap-2">
              <Image
                radius="md"
                shadow="sm"
                alt={subasta.imagen_sub}
                className="object-cover w-[400px] h-[210px]"
                src={`http://localhost:4000/img/subasta/${subasta.imagen_sub}`}
              />
            </div>
            <div className="shadow text-sm rounded-lg py-1">
              <div className="bg-[#009100] p-2 rounded-t-lg">
                <p className="text-xl text-white font-semibold text-center">
                  Datos de la subasta
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-[#a1653d]">
                  Fecha fin de la subasta:
                </p>
                <p className="text-[#009100] font-semibold text-[16px] -mt-1">
                  {tiempoRestante}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-2 py-2 px-2">
                <div className="items-end flex flex-col">
                  <p className="font-semibold">Apertura:</p>
                  <p className="font-semibold">Cierre:</p>
                  <p className="font-semibold">Ubicación:</p>
                  <p className="font-semibold">Cantidad:</p>
                  <p className="font-semibold">Tipo Variedad:</p>
                  <p className="font-semibold">Certificado:</p>
                  <p className="font-semibold">Descripción:</p>
                </div>
                <div>
                  <p>
                    {new Date(subasta.fecha_inicio_sub).toLocaleString("es-ES", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </p>
                  <p>
                    {new Date(subasta.fecha_fin_sub).toLocaleString("es-ES", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </p>
                  <p>
                    {subasta.nombre_vere} - {subasta.nombre_muni} -{" "}
                    {subasta.nombre_depar}
                  </p>
                  <p>
                    {subasta.cantidad_sub}{" "}
                    {subasta.unidad_peso_sub > 1
                      ? subasta.unidad_peso_sub + "s"
                      : subasta.unidad_peso_sub}
                  </p>
                  <p>{subasta.nombre_tipo_vari}</p>
                  <p className="underline cursor-pointer">
                    {subasta.certificado_sub}
                  </p>
                  <p>{subasta.descripcion_sub}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-[#a1653d]">PRECIO BASE:</p>
                <p className="text-[#009100] font-semibold text-lg -mt-2">
                  ${Number(subasta.precio_inicial_sub).toLocaleString("es-ES")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-[#e0e0e0] h-[460px] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-center">Ofertas</h3>
            <div>
              <p>Juan - 80000</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2 bg-[#e0e0e0] rounded-xl p-4 mt-2">
            <Input
              type="number"
              value={oferta}
              onChange={(e) => setOferta(e.target.value)}
              placeholder="Ingrese su oferta"
            />
            <Button onClick={handleSubmitOferta}>Realizar Oferta</Button>
          </div>
        </div>
        <div className="grid">
          <div className="bg-[#e0e0e0] w-64 rounded-xl p-4 items-center flex flex-col">
            <h3 className="text-lg font-semibold">Vendedor</h3>
            <Avatar
              src={
                subasta.imagen_user && subasta.imagen_user.length > 0
                  ? `http://localhost:4000/img/${subasta.imagen_user}`
                  : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
              }
              className="w-28 h-28"
            />
            <p className="text-center">{subasta.nombre_user}</p>
            <p className="text-center">{subasta.email_user}</p>
            <p className="text-center">{subasta.telefono_user}</p>
            <p className="text-[#a1653d]">Calificación del usuario</p>
            <div className="flex">
              <EstrellaLlena />
              <EstrellaLlena />
              <EstrellaLlena />
              <EstrellaMediaLlena />
              <EstrellaVacia />
            </div>
          </div>
          <div className="mt-2 flex flex-col h-60 bg-[#e0e0e0] gap-y-2 rounded-lg">
            <h3 className="text-lg font-semibold text-center mt-3">Postulantes</h3>
            <div className="flex-grow overflow-y-auto flex flex-wrap gap-2 justify-center">
              {Array.isArray(postsActivos) && postsActivos.length > 0 ? (
                postsActivos.map((postulante, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-xl w-52 h-10 flex justify-center items-center"
                  >
                    <Avatar
                      src={
                        postulante.imagen_user && postulante.imagen_user.length > 0
                          ? `http://localhost:4000/img/${postulante.imagen_user}`
                          : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
                      }
                      className="w-8 h-8"
                    />
                    <p>{postulante.nombre_user}</p>
                  </div>
                ))
              ) : (
                <p>No hay postulantes activos.</p>
              )}
            </div>
            <div className="flex justify-center mb-3">
              <Button
                onClick={handlePostulantesClick}
                className="bg-red-600 text-white rounded-xl"
              >
                Salir de la subasta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubastaUser;
