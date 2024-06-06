import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Image, Modal, ModalBody, ModalContent, Slider } from "@nextui-org/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSubastaContext } from "../context/SubastaContext";
import { usePostulantesContext } from "../context/PostulantesContext";
import { useOfertasContext } from "../context/OfertasContext";
import { useAuthContext } from "../context/AuthContext";
import { useCalificacionesContext } from "../context/CalificacionesContext";
import Swal from "sweetalert2";
import ModalContact from "./ModalContact";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function SubastaUser() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(0);
  const { getSub, subasta, EsperaSubs } = useSubastaContext();
  const { getPostsActivos, postsActivos, desactivarPosts } = usePostulantesContext();
  const { createOfert, ofertas, getOfertForSub, eliminarOfertas } = useOfertasContext();
  const { getCalificacionesUser, stats } = useCalificacionesContext();
  const { getUsers } = useAuthContext();
  const [precioActual, setPrecioActual] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    getOfertForSub(id);
  }, [id, getOfertForSub]);

  useEffect(() => {
    getSub(id);
    getPostsActivos(id);
  }, [id, getSub, getPostsActivos]);

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

      if (dias === 0 && horas === 1 && minutos < 8) {
        return `A la subasta le quedan, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
      } else {
        return `La subasta terminará en: ${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
      }
    }
  };

  useEffect(() => {
    if (!subasta || subasta.length === 0) return;

    const intervalId = setInterval(() => {
      subasta.forEach((subasta) => {
        const { pk_id_sub } = subasta;
        const { pk_cedula_user } = user;
        const tiempo = calcularDiferencia(subasta.fecha_inicio_sub, subasta.fecha_fin_sub);

        if (tiempo.includes("La subasta terminará en")) {
          Swal.fire({
            text: "A la subasta le quedan menos de 18 minutos para finalizar.",
            icon: "info",
          });
        } else if (tiempo.includes("La subasta empezará dentro de")) {
          EsperaSubs(pk_id_sub, pk_cedula_user);
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [subasta, user, EsperaSubs]);

  const calcularTiempoRestante = (inicio, fin) => {
    const diferenciaMs = fin - inicio;
    const segundos = Math.floor((diferenciaMs / 1000) % 60);
    const minutos = Math.floor((diferenciaMs / 1000 / 60) % 60);
    const horas = Math.floor((diferenciaMs / 1000 / 60 / 60) % 24);
    const dias = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24);
    return `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  };

  const handleSubmitOferta = async (e) => {
    e.preventDefault();
    const totalOferta = precioActual + oferta;
    if (totalOferta === precioActual) {
      Swal.fire({
        text: "La oferta debe ser mayor a 0.",
        icon: "warning",
      });
      return;
    }
    try {
      const data = {
        oferta_ofer: totalOferta,
        fk_id_usuario: user.pk_cedula_user,
        fk_id_subasta: id,
      };
      await createOfert(data, id);
      setOferta(0);
    } catch (error) {
      console.error("Error al enviar la oferta:", error);
    }
  };

  const handlePostulantesClick = async () => {
    try {
      const data = {
        fk_id_usuario: user.pk_cedula_user,
        fk_id_subasta: subasta.pk_id_sub,
      };
      if (user.pk_cedula_user === subasta.pk_cedula_user) {
        navigate(`/subcoffee`);
      } else {
        Swal.fire({
          text: "¿Estás seguro de salir de la subasta? Si es así, se eliminarán las ofertas que hayas creado.",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            desactivarPosts(data, id);
            eliminarOfertas(id, user.pk_cedula_user);
            navigate(`/subcoffee`);
            Swal.fire({
              text: "¡Salida de subasta exitosa!",
              icon: "success",
            });
          }
        });
      }
    } catch (error) {
      console.error("Error al desactivar la postulación:", error);
    }
  };

  useEffect(() => {
    const nuevoPrecioActual =
      Array.isArray(ofertas) && ofertas.length > 0
        ? Math.max(...ofertas.map((oferta) => oferta.oferta_ofer), 0)
        : Number(subasta.precio_inicial_sub);
    setPrecioActual(nuevoPrecioActual);
  }, [subasta.precio_inicial_sub, ofertas]);

  useEffect(() => {
    if (subasta && subasta.pk_cedula_user) {
      getCalificacionesUser(subasta.pk_cedula_user);
    }
  }, [subasta.pk_cedula_user, getCalificacionesUser]);

  const renderAverageStars = (average) => {
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 !== 0;
    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={index} size={14} color={colors.orange} className="mr-1" />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt size={24} color={colors.orange} className="mr-1" />
        )}
        {Array.from(
          { length: 5 - fullStars - (hasHalfStar ? 1 : 0) },
          (_, index) => (
            <FaStar key={index + fullStars + 1} size={12} color={colors.grey} className="mr-1" />
          )
        )}
      </div>
    );
  };

  return (
    <div className="h-auto bg-slate-300">
          <div className="px-16 pt-4 text-white ">
      <div className="font-bold p-1 text-xl items-center flex text-[#00684a] ">{subasta.pk_id_sub} - {subasta.nombre_tipo_vari}                         
      <div className={`rounded-lg border ml-2
        ${subasta.estado_sub === "abierta" ? "bg-green-500 border-green-600 text-green-50" : ""}
        ${subasta.estado_sub === "proceso" ? "bg-orange-500 border-orange-600 text-orange-50" : ""}
        ${subasta.estado_sub === "espera" ? "bg-blue-500 border-blue-600 text-blue-50" : ""}
        ${subasta.estado_sub === "cerrada" ? "bg-red-400 border-red-600 text-red-50" : ""}`}
      >
        <p className="text-sm text-default-50 p-0 px-1">{subasta.estado_sub}</p>
      </div></div>
      <div className="flex gap-3 w-full">
        <div className="bg-[#00684a] rounded-xl w-full p-4 h-full">
          <div className="grid gap-1">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Image
                radius="md"
                shadow="sm"
                alt={subasta.imagen_sub}
                className="object-cover w-[400px] h-[258px]"
                src={`http://localhost:4000/img/subasta/${subasta.imagen_sub}`}
              />
            </div>
            <div className="shadow text-sm rounded-lg py-1">
              <div className="bg-[#001e2b] p-2 rounded-t-lg">
                <p className="text-xl text-white font-semibold text-center">Datos de la subasta</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-white ">Fecha fin de la subasta:</p>
                <p className="text-[#001e2b] font-semibold text-[16px] text-center -mt-1">{calcularDiferencia(subasta.fecha_inicio_sub,subasta.fecha_fin_sub)}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-2 py-2 px-2 ">
                <div className="flex flex-col">
                  <p className="font-semibold">Apertura:</p>
                  <p className="font-semibold">Cierre:</p>
                  <p className="font-semibold">Ubicación:</p>
                  <p className="font-semibold">Cantidad:</p>
                  <p className="font-semibold">Tipo Variedad:</p>
                  <p className="font-semibold">Certificado:</p>
                  <p className="font-semibold">Descripción:</p>
                </div>
                <div>
                  <p> {new Date(subasta.fecha_inicio_sub).toLocaleString( "es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", } )} </p>
                  <p> {new Date(subasta.fecha_fin_sub).toLocaleString("es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })}</p>
                  <p> {subasta.nombre_vere} - {subasta.nombre_muni} - {subasta.nombre_depar}</p>
                  <p> {subasta.cantidad_sub} {subasta.cantidad_sub > 1 ? subasta.unidad_peso_sub + "s" : subasta.unidad_peso_sub} </p>
                  <p>{subasta.nombre_tipo_vari}</p>
                  <p className="underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap max-w-auto"> {subasta.certificado_sub} </p>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-auto">{subasta.descripcion_sub}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-white">PRECIO BASE:</p>
                <p className="text-[#001e2b] font-semibold text-lg -mt-2">${Number(subasta.precio_inicial_sub).toLocaleString("es-ES")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col h-auto">
          <div className="flex-grow bg-[#001e2b] rounded-xl p-4 overflow-y-auto  ">
            <h3 className="text-lg font-semibold text-center">Ofertas</h3>
            <div className={`overflow-y-auto  ${subasta.pk_cedula_user !== user.pk_cedula_user ? "max-h-[350px]" : "max-full" }`}>
              {Array.isArray(ofertas) && ofertas.length > 0 ? (
                ofertas.map((oferta) => (
                  <div
                    key={oferta.pk_id_ofer}
                    className={`p-1`}
                  >
                    { oferta.fk_id_usuario === user.pk_cedula_user
                      ? (                    
                      <div className="flex items-center justify-start">
                        <div className="flex items-center bg-[#00684a] w-full py-1 pr-12 rounded-2xl">
                          <img
                            src={`http://localhost:4000/img/${oferta.imagen_user}`}
                            alt="User Avatar"
                            className="w-12 h-12 mx-2 rounded-full"
                          />
                          <div>
                            <p className="font-semibold -mb-2">{oferta.nombre_user}</p>
                            <p>$ {oferta.oferta_ofer.toLocaleString()}</p>
                            <p className="text-xs -mt-1">{new Date(oferta.fecha_ofer).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ) : (                    
                      <div className="flex items-center justify-end">
                        <div className="flex items-center bg-slate-100 py-1 pl-12 rounded-2xl">
                          <div className="flex text-end flex-col">
                            <p className="font-semibold -mb-2">{oferta.nombre_user}</p>
                            <p>$ {oferta.oferta_ofer.toLocaleString()}</p>
                            <p className="text-xs -mt-1">{new Date(oferta.fecha_ofer).toLocaleString()}</p>
                          </div>
                          <img
                            src={`http://localhost:4000/img/${oferta.imagen_user}`}
                            alt="User Avatar"
                            className="w-12 h-12 mx-2 rounded-full"
                          />
                        </div>
                      </div>)
                    }
                  </div>
                ))
              ) : (
                <p className="text-center">Aún no hay ofertas</p>
              )}
            </div>
          </div>
          {subasta.pk_cedula_user !== user.pk_cedula_user && (
            <div className="bg-[#001e2b] rounded-xl p-4 mt-2 w-full">
              <p className="text-center">Precio actual: ${precioActual.toLocaleString()}</p>
              <form onSubmit={handleSubmitOferta} className="w-full flex flex-col items-center">
              <Slider
                label="Añadir Puja"
                step={20000}
                value={oferta}
                onChange={(value) => setOferta(value)}
                maxValue={500000} 
                minValue={0}
                showSteps={true}
                showTooltip={true}
                showOutline={true}
                disableThumbScale={true}
                formatOptions={{
                  style: "currency",
                  currency: "COP",
                  currencyDisplay: "symbol",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
                tooltipValueFormatOptions={{
                  style: "currency",
                  currency: "COP",
                  currencyDisplay: "symbol",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
                classNames={{
                  base: "w-full",
                  filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                  labelWrapper: "mb-2",
                  label: "font-medium text-default-100 text-medium",
                  value: "font-medium text-default-100 text-small",
                  thumb: [
                    "transition-size",
                    "bg-gradient-to-r from-secondary-400 to-primary-500",
                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                  ],
                  step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                }}
                tooltipProps={{
                  offset: 10,
                  placement: "bottom",
                  classNames: {
                    base: ["before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500"],
                    content: ["py-2 shadow-xl text-white bg-gradient-to-r from-secondary-400 to-primary-500"],
                  },
                }}
              />
              <Button type="submit" className="border-[#00ed64] inline-flex items-center justify-center py-2 px-4 bg-[#00ed64] text-white  font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#001e2b]  hover:text-[#001e2b]  m-4">Realizar Oferta</Button>
            </form>
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-y-2">
          <div className="bg-[#00684a] w-64 rounded-xl p-2 items-center flex flex-col">
            <h3 className="text-lg font-semibold text-white">Vendedor</h3>
            <Avatar
              src={subasta.imagen_user && subasta.imagen_user.length > 0? `http://localhost:4000/img/${subasta.imagen_user}`: "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
              className="w-28 h-28"
            />
            <div className="flex items-center">
              <Link className="text-center hover:underline" to={(`/profile/${subasta.pk_cedula_user}`)}>{subasta.nombre_user}</Link>
            </div>
            <p className="text-center">{subasta.email_user}</p>
            <p className="text-center">{subasta.telefono_user}</p>
            <p className="text-[#001e2b] font-bold">Calificación del usuario</p>
            <div className="flex flex-col items-start">
              {stats && stats.promedio != null && !isNaN(stats.promedio) ? (
                <div className="flex gap-x-2">
                  <div className="text-xl font-bold">{parseFloat(stats.promedio).toFixed(1)}</div>
                  {renderAverageStars(stats.promedio)}
                </div>
              ) : (
                "Usuario sin calificaciones"
              )}
            </div>
          </div>
          <div className="overflow-x-auto bg-[#00684a] rounded-xl flex flex-col h-full">
            <h3 className="text-lg font-semibold text-center mt-2">Postulantes</h3>
            <div className="flex-grow overflow-y-auto flex flex-col gap-1 items-center mt-1">
              {Array.isArray(postsActivos) && postsActivos.length > 0 ? (
                postsActivos.map((postulante, i) => (
                  <div key={i} className="rounded-xl w-52 gap-x-1 h-10 flex px-2 items-center overflow-y-auto bg-[#001e2b]  ">
                    <Avatar
                      src={postulante.imagen_user && postulante.imagen_user.length > 0 ? `http://localhost:4000/img/${postulante.imagen_user}` : "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
                      className="w-8 h-8"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{postulante.nombre_user}</p>
                      <p className="text-xs -mt-1">{postulante.email_user}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay postulantes activos.</p>
              )}
            </div>
            <div className="flex justify-center mb-3 mt-3 gap-x-1">
              <Button
                onClick={handlePostulantesClick}
                className="bg-red-600 text-white rounded-xl"
              >
                Salir de la subasta
              </Button>
              <Button auto color="primary" onClick={() => setIsModalOpen(true)}>
                Contactar
              </Button>
            </div>
            <ModalContact open={isModalOpen} onClose={() => setIsModalOpen(false)} id={id} />
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default SubastaUser;
