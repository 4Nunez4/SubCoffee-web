import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterMunicipioMolecule from "../molecules/RegisterMunicipioMolecule";

function FormMunicipioOrganism ({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterMunicipioMolecule initialData={initialData} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormMunicipioOrganism