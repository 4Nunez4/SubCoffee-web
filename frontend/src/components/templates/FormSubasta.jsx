import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterSubastaMolecule from "../molecules/RegisterSubastaMolecule";

function FormSubasta ({ open, onClose, title, titleBtn, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterSubastaMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormSubasta