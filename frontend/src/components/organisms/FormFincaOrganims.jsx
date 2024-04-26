import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterFincaMolecule from "../molecules/RegisterFincaMolecule";

function FormFincaOrganims ({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterFincaMolecule initialData={initialData} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormFincaOrganims