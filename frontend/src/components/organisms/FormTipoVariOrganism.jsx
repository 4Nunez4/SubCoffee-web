import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterTipoVariMolecule from "../molecules/RegisterTipoVariMolecule";

function FormTipoVariOrganism ({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterTipoVariMolecule initialData={initialData} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormTipoVariOrganism