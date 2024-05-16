import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterVariedadUserMolecule from "../molecules/RegisterVariedadUserMolecule"

function FormVariedadUser({ open, onClose, title, titleBtn, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterVariedadUserMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormVariedadUser