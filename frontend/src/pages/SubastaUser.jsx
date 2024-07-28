import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Image, Slider } from "@nextui-org/react";
import Swal from "sweetalert2";

import { useSubastaContext } from "../context/SubastaContext";
import { usePostulantesContext } from "../context/PostulantesContext";
import { useOfertasContext } from "../context/OfertasContext";
import { useAuthContext } from "../context/AuthContext";

import FormGanador from "../components/templates/FormGanador";
import "./scroll.css"

function SubastaUser() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(0);
  const [ precioActual, setPrecioActual ] = useState(0);
  const [ hoveredLinks, setHoveredLinks ] = useState({});
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ tiempoRestante, setTiempoRestante ] = useState("");
  const [ subastaIniciada, setSubastaIniciada ] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { getSub, subasta, EsperaSubs, activarSubs, ProcesoSubs, desactivarSubs } = useSubastaContext();
  const { getPostsActivos, postsActivos, desactivarPosts } = usePostulantesContext();
  const { createOfert, ofertas, getOfertForSub, eliminarOfertas, getOfertMayor } = useOfertasContext();
  const { getUsers } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getOfertForSub(id);
  }, []);

  useEffect(() => {
    getSub(id);
    getPostsActivos(id);
  }, []);

  useEffect(() => {
    const calcularDiferencia = (fechaInicio, fechaFin) => {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      const ahora = new Date();
  
      if (ahora < inicio) {
        activarSubs(id, user.pk_cedula_user)
        setSubastaIniciada(false);
        return `La subasta empezará dentro de ${calcularTiempoRestante(ahora, inicio)}`;
      } else if (ahora > fin && !subasta.ganador_sub) {
        EsperaSubs(id, user.pk_cedula_user)
        setSubastaIniciada(true);
        return "Subasta terminada, falta escoger ganador";
      }  else if (ahora > fin) {
        EsperaSubs(id, user.pk_cedula_user)
        setSubastaIniciada(false);
        return "Subasta terminadaaa";
        } else {
        setSubastaIniciada(false);
        ProcesoSubs(id, user.pk_cedula_user)
        const diferenciaMs = fin - ahora;
        const segundos = Math.floor((diferenciaMs / 1000) % 60);
        const minutos = Math.floor((diferenciaMs / 1000 / 60) % 60);
        const horas = Math.floor((diferenciaMs / 1000 / 60 / 60) % 24);
        const dias = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24);
        return `La subasta terminará en: ${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
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
  
    const actualizarTiempo = () => {
      setTiempoRestante(
        calcularDiferencia(subasta.fecha_inicio_sub, subasta.fecha_fin_sub)
      );
    };
  
    const intervalId = setInterval(actualizarTiempo, 1000);
    actualizarTiempo(); // Para calcular el tiempo restante inmediatamente
    return () => clearInterval(intervalId);
  }, [subasta.fecha_inicio_sub, subasta.fecha_fin_sub]);

  useEffect(() => {
    if (subasta && subastaIniciada && !subasta.ganador_sub) {
      if (ofertas && ofertas.length === 0) {
        getOfertMayor(id);
      } else {
        console.log("No hay ofertas en esta subasta.");
      }
    }
  }, []);

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
      } else if (subastaIniciada) {
        desactivarPosts(data, id);
        navigate(`/subcoffee`);
        Swal.fire({
          text: "¡Salida de subasta exitosa!",
          icon: "success",
        });
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
    const nuevoPrecioActual = Array.isArray(ofertas) && ofertas.length > 0
      ? Math.max(...ofertas.map((oferta) => oferta.oferta_ofer), 0)
      : Number(subasta.precio_inicial_sub);
    setPrecioActual(nuevoPrecioActual);
  }, []);
  
  const handleMouseEnter = (id) => {
    setHoveredLinks({ ...hoveredLinks, [id]: true });
  };

  const handleMouseLeave = (id) => {
    setHoveredLinks({ ...hoveredLinks, [id]: false });
  };

  const handleUserClick = (oferta) => {
    setSelectedUser(oferta);
    setIsModalOpen(true);
  };

  return (
    <div className="px-16 pt-4 mb-10">
      <div className="font-bold p-1 text-xl items-center flex">{subasta.pk_id_sub} - {subasta.nombre_tipo_vari}                         
        <p className={`text-sm py-1 rounded-lg px-2 ml-2 
          ${subasta.estado_sub === "abierta"? "bg-[#d1f4e0] text-[#14a150]": ""}
          ${subasta.estado_sub === "proceso"? "bg-orange-100 text-orange-500": ""}
          ${subasta.estado_sub === "espera"? "bg-blue-100 text-blue-500": ""}
          ${subasta.estado_sub === "cerrada"? "bg-[#fdd0df] text-[#f31263]": ""} 
        `}>
          {subasta.estado_sub}
        </p>
      </div>
      <div className="flex gap-3 w-full">
        <div className="bg-[#e0e0e0] rounded-xl w-full p-4 h-full">
          <div className="grid gap-1">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Image
                radius="md"
                shadow="sm"
                alt={subasta.imagen_sub}
                className="object-cover w-[400px] h-[258px]"
                src={`http://localhost:4000/subastas/${subasta.imagen_sub}`}
              />
            </div>
            <div className="shadow text-sm rounded-lg py-1">
              <div className="bg-[#39A800] p-2 rounded-t-lg">
                <p className="text-xl text-white font-semibold text-center">Datos de la subasta</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold ">Fecha fin de la subasta:</p>
                <p className="font-semibold  text-center"> {tiempoRestante} </p>
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
                  <p> {new Date(subasta.fecha_inicio_sub).toLocaleString( "es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", } )} </p>
                  <p> {new Date(subasta.fecha_fin_sub).toLocaleString("es-ES", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })}</p>
                  <p className="flex overflow-hidden text-ellipsis whitespace-nowrap w-44"> {subasta.nombre_vere} - {subasta.nombre_muni} - {subasta.nombre_depar}</p>
                  <p> {subasta.cantidad_sub} {subasta.cantidad_sub > 1 ? subasta.unidad_peso_sub + "s" : subasta.unidad_peso_sub} </p>
                  <div className="scroll-container w-full" onMouseEnter={() => handleMouseEnter('certificado')} onMouseLeave={() => handleMouseLeave('certificado')}>
                    <p className={`scroll-text ${hoveredLinks['certificado'] ? 'scroll-active' : 'cursor-pointer underline overflow-hidden text-ellipsis whitespace-nowrap w-44'}`}><a href={`http://localhost:4000/subastas/${subasta.certificado_sub}`} download={subasta.certificado_sub}>{subasta.certificado_sub}</a></p>
                  </div>
                  <p>{subasta.nombre_tipo_vari}</p>
                  <div className="scroll-container w-full" onMouseEnter={() => handleMouseEnter('descripcion')} onMouseLeave={() => handleMouseLeave('descripcion')}>
                    <p className={`scroll-text ${hoveredLinks['descripcion'] ? 'scroll-active' : 'overflow-hidden text-ellipsis whitespace-nowrap w-44'}`}>{subasta.descripcion_sub}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold ">PRECIO BASE:</p>
                <p className="text-[#39A800]  font-semibold text-lg -mt-2">${Number(subasta.precio_inicial_sub).toLocaleString("es-ES")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col h-auto">
          <div className="flex-grow bg-[#e0e0e0] rounded-xl p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-center">Ofertas</h3>
            <div className={`overflow-y-auto  ${subasta.pk_cedula_user !== user.pk_cedula_user ? "max-h-[350px]" : "max-full" }`}>
              {Array.isArray(ofertas) && ofertas.length > 0 ? (
                ofertas.map((oferta) => (
                  <div    
                    key={oferta.pk_id_ofer} 
                    className={`p-1 cursor-pointer`} 
                    onClick={() => handleUserClick(oferta)}>
                      { oferta.fk_id_usuario === user.pk_cedula_user
                        ? (                    
                        <div className="flex items-center justify-start">
                          <div className="flex items-center bg-gray-100 py-1 pr-12 rounded-2xl">
                            <img
                              src={oferta.imagen_user && oferta.imagen_user.length > 0 ? `http://localhost:4000/usuarios/${oferta.imagen_user}`: "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
                              alt="User Avatar"
                              className="h-12 rounded-full mx-2"
                            />
                            <div className="-ml-1">
                              <p className="font-semibold -mb-2">{oferta.nombre_user}</p>
                              <p>$ {oferta.oferta_ofer.toLocaleString()}</p>
                              <p className="text-xs -mt-1">{new Date(oferta.fecha_ofer).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ) : (                    
                        <div className="flex items-center justify-end">
                          <div className="flex items-center bg-slate-100 py-1 pl-8 rounded-2xl">
                            <div className="flex text-end flex-col -mr-1">
                              <p className="font-semibold -mb-2">{oferta.nombre_user}</p>
                              <p>$ {oferta.oferta_ofer.toLocaleString()}</p>
                              <p className="text-xs -mt-1">{new Date(oferta.fecha_ofer).toLocaleString()}</p>
                            </div>
                            <img
                              src={oferta.imagen_user && oferta.imagen_user.length > 0? `http://localhost:4000/usuarios/${oferta.imagen_user}`: "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
                              alt="User Avatar"
                              className="h-12 mx-2 rounded-full"
                            />
                          </div>
                        </div>)
                      }
                  </div>
                ))
              ) : (
                <p>Aún no hay ofertas</p>
              )}
            </div>
          </div>
          {subasta.estado_sub === "proceso" && subasta.pk_cedula_user !== user.pk_cedula_user ? (
            <div className="bg-[#e0e0e0] rounded-xl p-4 mt-2 w-full">
              <p className="text-center">Precio actual: ${precioActual.toLocaleString()}</p>
              <form onSubmit={handleSubmitOferta} className="w-full flex flex-col items-center">
              <Slider
                label="Añadir A La Puja"
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
                  filler: "bg-green-500", 
                  labelWrapper: "mb-2",
                  label: "font-medium text-default-700 text-medium",
                  value: "font-medium text-default-500 text-small",
                  thumb: [
                    "transition-size",
                    "bg-green-700",
                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                  ],
                  step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                }}
                tooltipProps={{
                  offset: 10,
                  placement: "bottom",
                  classNames: {
                    base: ["before:bg-green-500"], 
                    content: ["py-2 shadow-xl text-white bg-green-500"], 
                  },
                }}
              />
                <Button type="submit">Realizar Oferta</Button>
              </form>
            </div>
          ) : (
            <>
              {subasta.pk_cedula_user === user.pk_cedula_user ? (
                ''
              ) : (
                <div className="bg-[#e0e0e0] rounded-lg p-4 mt-2 w-full text-center">
                  <p className="text-gray-800 font-medium">
                    Ya no se pueden realizar ofertas porque el tiempo ha finalizado.                    
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="grid grid-rows-2 gap-y-2">
          <div className="bg-[#e0e0e0] w-64 rounded-xl p-2 items-center flex flex-col">
            <h3 className="text-lg font-semibold ">Vendedor</h3>
            <img
              src={subasta.imagen_user ? `http://localhost:4000/usuarios/${subasta.imagen_user}` : "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
              alt="User"
              className="rounded-full w-48 h-48 object-cover"
            />
            <div className="flex items-center">
              <Link className="text-center hover:underline" to={(`/profile/${subasta.pk_cedula_user}`)}>{subasta.nombre_user}</Link>
            </div>
            <p className="text-center">{subasta.email_user}</p>
            <p className="text-center">{subasta.telefono_user}</p>
          </div>
          <div className="overflow-x-auto bg-[#e0e0e0] rounded-xl flex flex-col h-full">
            <h3 className="text-lg font-semibold text-center mt-2">Postulantes</h3>
            <div className="flex-grow overflow-y-auto flex flex-col gap-1 items-center mt-1">
              {Array.isArray(postsActivos) && postsActivos.length > 0 ? (
                postsActivos.map((postulante, i) => (
                  <div key={i} className="rounded-xl w-52 gap-x-1 h-10 flex px-2 items-center overflow-y-auto">
                    <img
                      src={postulante.imagen_user && postulante.imagen_user.length > 0 ? `http://localhost:4000/usuarios/${postulante.imagen_user}` : "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
                      alt="User"
                      className="rounded-full w-8 h-8 object-cover"
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
            </div>
            <FormGanador
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={"Contactar"}
                id={id}
                selectedUser={selectedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubastaUser;
