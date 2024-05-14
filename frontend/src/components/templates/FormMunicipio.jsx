import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterMunicipioMolecule from "../molecules/RegisterMunicipioMolecule";

function FormMunicipio ({ open, onClose, title, titleBtn, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterMunicipioMolecule mode={mode} titleBtn={titleBtn} onClose={onClose} />
      </ModalForm>
    </>
  );
};

export default FormMunicipio