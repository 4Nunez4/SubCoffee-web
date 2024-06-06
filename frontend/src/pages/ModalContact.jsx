import { Modal, ModalContent, Avatar } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useSubastaContext } from "../context/SubastaContext";
import { useOfertasContext } from "../context/OfertasContext";

function ModalContact({ onClose, id, open }) {
  const { getSub, subasta } = useSubastaContext();
  const { getOfertMayor, ofertasMayor } = useOfertasContext();

  useEffect(() => {
    getSub(id);
    getOfertMayor(id);
  }, [id, getOfertMayor, getSub]);

  const renderUserData = (user) => (
    <div className="flex flex-col items-start">
      <p><strong>Nombre:</strong> {user.nombre_user}</p>
      <p><strong>Email:</strong> {user.email_user}</p>
      <p><strong>Teléfono:</strong> {user.telefono_user}</p>
    </div>
  );

  const renderAvatar = (imageUrl, altText) => (
    <Avatar
      src={`http://localhost:4000/img/${imageUrl}`}
      alt={altText}
      className="w-40 h-40 mt-4"
    />
  );

  return (
    <Modal
      isOpen={open}
      size="3xl"
      onClose={onClose}
      isDismissable={false}
      placement="top-center"
      className="p-6"
    >
      <ModalContent>
        <h2 className="text-center text-2xl font-bold mb-4">Contactar</h2>
        <div className="flex justify-between gap-8">
          <div className="w-1/2 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Vendedor</h3>
            {subasta ? (
              <>
                {renderUserData(subasta)}
                {renderAvatar(subasta.imagen_user, "Imagen del vendedor")}
              </>
            ) : (
              <p>Cargando datos del vendedor...</p>
            )}
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Mayor Pujador</h3>
            {ofertasMayor ? (
              <>
                {renderUserData(ofertasMayor)}
                {renderAvatar(ofertasMayor.imagen_user, "Imagen del mayor pujador")}
                <p className="mt-2"><strong>Oferta:</strong> ${ofertasMayor.oferta_ofer}</p>
              </>
            ) : (
              <p>No hay una mayor puja</p>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default ModalContact;
