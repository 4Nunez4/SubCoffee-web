import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterVeredaMolecule from "../molecules/RegisterVereda";

function FormVeredaOrganism ({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterVeredaMolecule initialData={initialData} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormVeredaOrganism