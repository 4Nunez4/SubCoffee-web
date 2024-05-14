import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterVeredaMolecule from "../molecules/RegisterVeredaMolecule";

function FormVereda ({ open, onClose, title, titleBtn, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterVeredaMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormVereda