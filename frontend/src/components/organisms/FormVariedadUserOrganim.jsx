import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterVariedadUserMolecule from "../molecules/RegisterVariedadUserMolecule"

function FormVariedadUserOrganim ({ open, onClose, title, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterVariedadUserMolecule initialData={initialData} title={title} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormVariedadUserOrganim