import React from "react";
import { ModalForm } from "./ModalForm";
import LoginFormMolecule from "../molecules/LoginFormMolecule";

function FormLoginOrganims({ open, onClose, handleSubmit }) {
  return (
    <div>
      <ModalForm open={open} onClose={onClose} >
        <LoginFormMolecule handleSubmit={handleSubmit} />
      </ModalForm>
    </div>
  );
}

export default FormLoginOrganims;
