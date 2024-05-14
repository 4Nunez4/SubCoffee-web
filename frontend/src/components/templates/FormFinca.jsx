import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterFincaMolecule from "../molecules/RegisterFincaMolecule";

function FormFinca ({ open, onClose, title, titleBtn, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterFincaMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormFinca