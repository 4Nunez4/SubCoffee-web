import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterCalificacion from "../molecules/RegisterCalificacion";
import { useCalificacionesContext } from "../../context/CalificacionesContext";

function FormRegisCalificacion ({ open, onClose, title, titleBtn, fk_user, mode }) {
  const { cerrarModal, setCerrarModal } = useCalificacionesContext();
  useEffect(() => {
    if (cerrarModal) {
      onClose();
      setCerrarModal(false);
    }
  }, [cerrarModal, onClose, setCerrarModal]);
  
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <RegisterCalificacion titleBtn={titleBtn} mode={mode} fk_user={fk_user} />
      </ModalForm>
    </>
  );
};

export default FormRegisCalificacion