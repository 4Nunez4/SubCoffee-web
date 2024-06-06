import { Modal, ModalBody, ModalContent, ModalHeader, Avatar } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useSubastaContext } from "../context/SubastaContext";
import { useOfertasContext } from "../context/OfertasContext";

function ModalContact({ onCloseModal, id }) {
  const { getSub, subasta } = useSubastaContext();
  const { getOfertMayor, ofertasMayor } = useOfertasContext();

  useEffect(() => {
    getSub(id);
    getOfertMayor(id);
  }, [id, getOfertMayor]);

  return (
    <Modal
      isOpen={true}
      size="3xl"
      onClose={onCloseModal}
      isDismissable={false}
      placement="top-center"
    >
      <ModalHeader>Contactar</ModalHeader>
      <ModalContent>
        <div className="flex justify-between">
          <div className="w-1/2">
            {subasta ? (
              <>
                <div className="flex flex-col items-start">
                  <p>
                    <strong>Nombre:</strong> {subasta.nombre_user}
                  </p>
                  <p>
                    <strong>Email:</strong> {subasta.email_user}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {subasta.telefono_user}
                  </p>
                </div>
                <Avatar
                  src={`http://localhost:4000/img/${subasta.imagen_user}`}
                  alt="Imagen del vendedor"
                  className="w-40 h-40 mt-4"
                />
              </>
            ) : (
              <p>Cargando datos del vendedor...</p>
            )}
          </div>
          <div className="w-1/2">
            {ofertasMayor ? (
              <>
                <div className="flex flex-col items-start">
                  <p>
                    <strong>Nombre:</strong> {ofertasMayor.nombre_user}
                  </p>
                  <p>
                    <strong>Email:</strong> {ofertasMayor.email_user}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {ofertasMayor.telefono_user}
                  </p>
                  <p>
                    <strong>Oferta:</strong> $
                    {ofertasMayor.oferta_ofer}
                  </p>
                </div>
                <Avatar
                  src={`http://localhost:4000/img/${ofertasMayor.imagen_user}`}
                  alt="Imagen del mayor pujador"
                  className="w-40 h-40 mt-4"
                />
              </>
            ) : (
              <p>Cargando datos del mayor pujador...</p>
            )}
          </div>
        </div>
        <ModalBody>
          <button
            onClick={onCloseModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Salir
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalContact;
