import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterSubastaMolecule from "../molecules/RegisterSubastaMolecule";

function FormSubasta ({ open, onClose, title, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterSubastaMolecule initialData={initialData} title={title} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormSubasta