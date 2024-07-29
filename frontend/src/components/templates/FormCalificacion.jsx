import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import CalificacionesTable from "../Guard/CalificacionesTable";

function FormCalificacion ({ open, onClose, title, titleBtn, fk_user }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <CalificacionesTable titleBtn={titleBtn} fk_user={fk_user} />
      </ModalForm>
    </>
  );
};

export default FormCalificacion