import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterDepartMolecule from "../molecules/RegisterDepartMolecule";

function FormDepartamentoOrganism ({ open, onClose, title, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterDepartMolecule initialData={initialData} title={title} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormDepartamentoOrganism