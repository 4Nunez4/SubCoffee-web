import { Avatar, Button } from "@nextui-org/react";
import React, { useEffect } from "react";

import { useSubastaContext } from "../../context/SubastaContext";
import { useOfertasContext } from "../../context/OfertasContext";
import { useNavigate } from "react-router-dom";

function ModalContact({ id }) {
  const { getSub, subasta, establecerGanador, getSubs, desactivarSubs, getSubForUser } = useSubastaContext();
  const { getOfertMayor, ofertasMayor } = useOfertasContext();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()

  useEffect(() => {
    getSub(id);
    getOfertMayor(id);
  }, [id, getOfertMayor, getSub]);

  const handleEstablecerGanador = () => {
    const data = {
      ganador_sub: ofertasMayor.pk_cedula_user,
      precio_final_sub: ofertasMayor.oferta_ofer,
    }

    if (ofertasMayor && user) {
      establecerGanador(id, data);
      getSubs()
      getSubForUser(user.pk_cedula_user)
      desactivarSubs(id, user.pk_cedula_user)
      navigate("/subcoffee")
    }
  };

  return (
    <>
      <div className="flex justify-between gap-8">
        <div className="w-1/2 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Vendedor</h3>
          {subasta && (
            <>
              <div className="flex flex-col items-start">
                <p><strong>Nombre:</strong> {subasta.nombre_user}</p>
                <p><strong>Email:</strong> {subasta.email_user}</p>
                <p><strong>Teléfono:</strong> {subasta.telefono_user}</p>
              </div>
              <Avatar
                src={subasta.imagen_user ? `http://localhost:4000/usuarios/${subasta.imagen_user}` : "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
                alt="Imagen del vendedor"
                className="w-40 h-40 mt-4"
              />
            </>
          )}
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Mayor Pujador</h3>
          {ofertasMayor ? (
            <>
              <div className="flex flex-col items-start">
                <p><strong>Nombre:</strong> {ofertasMayor.nombre_user}</p>
                <p><strong>Email:</strong> {ofertasMayor.email_user}</p>
                <p><strong>Teléfono:</strong> {ofertasMayor.telefono_user}</p>
              </div>
              <Avatar
                src={ofertasMayor.imagen_user ? `http://localhost:4000/usuarios/${ofertasMayor.imagen_user}` : "http://localhost:4000/usuarios/imagen_de_usuario.webp"}
                alt="Imagen del mayor pujador"
                className="w-40 h-40 mt-4"
              />
              <p className="mt-2"><strong>Oferta:</strong> ${ofertasMayor.oferta_ofer}</p>
            </>
          ) : (
            <p>No hay una mayor puja</p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        {user.pk_cedula_user === subasta.pk_cedula_user && (
          <Button
            className="py-2 mt-2 px-4 bg-[#00684a] w-auto text-white font-semibold rounded-lg"
            size="lg"
            onClick={handleEstablecerGanador}
          >
            Establecer a {ofertasMayor ? ofertasMayor.nombre_user : ""} como
            ganador
          </Button>
        )}
      </div>
    </>
  );
}

export default ModalContact;
