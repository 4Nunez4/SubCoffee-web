import React, { useEffect, useState } from "react";
import { Avatar, Button, Link } from "@nextui-org/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useSubastaContext } from "../../context/SubastaContext";
import { useOfertasContext } from "../../context/OfertasContext";
import { useCalificacionesContext } from "../../context/CalificacionesContext";
import FormCalificacion from "../templates/FormCalificaion";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function ModalContact({ id, selectedUser }) {
  const { getSub, subasta, establecerGanador, getSubs, desactivarSubs, getSubForUser } = useSubastaContext();
  const { getOfertMayor, ofertasMayor } = useOfertasContext();
  const { getCalificacionesUser, stats } = useCalificacionesContext();
  const [abrirModalCalificacion, setAbrirModalCalificacion] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    getSub(id);
    if (!selectedUser) {
      getOfertMayor(id);
    }
  }, [id, getOfertMayor, getSub, selectedUser]);

  useEffect(() => {
    const displayUser = selectedUser || ofertasMayor;
    if (displayUser) {
      getCalificacionesUser(displayUser.pk_cedula_user);
    }
  }, [selectedUser, ofertasMayor, getCalificacionesUser]);

  const handleEstablecerGanador = () => {
    const ganador = selectedUser || ofertasMayor;
    if (ganador && user) {
      const data = {
        ganador_sub: ganador.pk_cedula_user,
        precio_final_sub: ganador.oferta_ofer,
      }
      establecerGanador(id, data);
      getSubs()
      getSubForUser(user.pk_cedula_user)
      desactivarSubs(id, user.pk_cedula_user)
      navigate("/subcoffee")
    }
  };

  const renderAverageStars = (average) => {
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 !== 0;
    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={index} size={20} color={colors.orange} className="mr-1" />
        ))}
        {hasHalfStar && <FaStarHalfAlt size={20} color={colors.orange} className="mr-1" />}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }, (_, index) => (
          <FaStar key={index + fullStars + 1} size={20} color={colors.grey} className="mr-1" />
        ))}
      </div>
    );
  };

  const displayUser = selectedUser || ofertasMayor;

  return (
    <>
      <div className="flex justify-between gap-8">
        <div className="w-1/2 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Calificaciones del Usuario</h3>
          {stats && stats.promedio != null && !isNaN(stats.promedio) ? (
            <>
              <div className="flex gap-x-2 flex-col items-center">
                <div className="text-6xl font-bold mx-2">
                  {parseFloat(stats.promedio).toFixed(1)}
                </div>
                {renderAverageStars(stats.promedio)}
              </div>
              <Link
                onClick={() => setAbrirModalCalificacion(true)}
                showAnchorIcon
                className="cursor-pointer hover:underline text-black flex justify-center mt-2"
              >
                Calificaciones y opiniones
              </Link>
            </>
          ) : (
            <div className="flex w-full justify-center">
              <p className="text-xl my-2 text-gray-400 font-semibold">Usuario sin calificaciones.</p>
              <Link
                onClick={() => setAbrirModalCalificacion(true)}
                showAnchorIcon
                className="cursor-pointer hover:underline text-black flex justify-center mt-2"
              >
                Calificaciones y opiniones
              </Link>
            </div>
          )}
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Usuario Seleccionado / Mayor Pujador</h3>
          {displayUser ? (
            <>
              <div className="flex flex-col items-start">
                <p><strong>Nombre:</strong> {displayUser.nombre_user || 'No disponible'}</p>
                <p><strong>Email:</strong> {displayUser.email_user || 'No disponible'}</p>
                <p><strong>Teléfono:</strong> {displayUser.telefono_user || 'No disponible'}</p>
              </div>
              <Avatar
                src={displayUser.imagen_user ? `http://localhost:4000/usuarios/${displayUser.imagen_user}` : "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
                alt="Imagen del usuario"
                className="w-40 h-40 mt-4"
              />
              <p className="mt-2"><strong>Oferta:</strong> ${displayUser.oferta_ofer?.toLocaleString() || 'No disponible'}</p>
            </>
          ) : (
            <p>No hay un usuario seleccionado o mayor puja</p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        {user.pk_cedula_user === subasta.pk_cedula_user && displayUser && (
          <Button
            className="text-white bg-[#39A800] rounded-lg font-bold flex justify-center items-center"
            size="lg"
            onClick={handleEstablecerGanador}
          >
            Establecer a {displayUser.nombre_user || 'Usuario seleccionado'} como
            ganador
          </Button>
        )}
      </div>
      <FormCalificacion
        open={abrirModalCalificacion}
        onClose={() => setAbrirModalCalificacion(false)}
        fk_user={displayUser?.pk_cedula_user}
        title={"Calificaciones de usuario"}
        titleBtn={"Registrar calificación"}
      />
    </>
  );
}

export default ModalContact;