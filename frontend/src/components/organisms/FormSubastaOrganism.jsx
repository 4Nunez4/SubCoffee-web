import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterSubastaMolecule from "../molecules/RegisterSubastaMolecule";

function FormSubastaOrganism ({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterSubastaMolecule initialData={initialData} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormSubastaOrganism