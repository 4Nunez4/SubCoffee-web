import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterVariedadUserMolecule from "../molecules/RegisterVariedadUserMolecule"

function FormVariedadUserOrganim ({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterVariedadUserMolecule initialData={initialData} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormVariedadUserOrganim