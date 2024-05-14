import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterDepartMolecule from "../molecules/RegisterDepartMolecule";

function FormDepartamento ({ open, onClose, title, titleBtn, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <RegisterDepartMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormDepartamento