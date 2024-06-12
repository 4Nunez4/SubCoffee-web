import React, { useEffect } from "react";
import ModalContact from "../Guard/ModalContact";
import { ModalFormXl } from "../organisms/ModalFormXl";
import { useSubastaContext } from "../../context/SubastaContext";

function FormGanador ({ open, onClose, title, id }) {
  const { cerrarModal, serCerrarModal } = useSubastaContext()
  useEffect(() => {
    if (cerrarModal) {
      onClose();
      serCerrarModal(false);
    }
  }, [cerrarModal, onClose, serCerrarModal]);

  return (
    <>
      <ModalFormXl open={open} onClose={onClose} title={title}>
        <ModalContact id={id} />
      </ModalFormXl>
    </>
  );
};

export default FormGanador