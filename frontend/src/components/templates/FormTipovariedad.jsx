import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterTipoVariMolecule from "../molecules/RegisterTipoVariMolecule"

function FormTipovariedad ({ open, onClose, title, titleBtn, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterTipoVariMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormTipovariedad