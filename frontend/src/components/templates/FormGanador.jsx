import React, { useEffect } from "react";
import { ModalFormXl } from "../organisms/ModalFormXl";
import { useSubastaContext } from "../../context/SubastaContext";
import ModalContact from "../organisms/ModalContact";

function FormGanador ({ open, onClose, title, id , selectedUser}) {
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
        <ModalContact id={id} selectedUser={selectedUser}/>
      </ModalFormXl>
    </>
  );
};

export default FormGanador