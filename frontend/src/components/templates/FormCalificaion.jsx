import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import { useDepartContext } from "../../context/DeparContext";
import CalificacionesTable from "../Guard/CalificacionesTable";

function FormCalificaion ({ open, onClose, title, titleBtn, fk_user }) {
  const { cerrarModal, serCerrarModal } = useDepartContext();

  useEffect(() => {
    if (cerrarModal) {
      onClose();
      serCerrarModal(false);
    }
  }, [cerrarModal, onClose, serCerrarModal]);
  
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <CalificacionesTable titleBtn={titleBtn} fk_user={fk_user} />
      </ModalForm>
    </>
  );
};

export default FormCalificaion