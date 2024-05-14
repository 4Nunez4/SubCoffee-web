import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import LoginFormMolecule from "../molecules/LoginFormMolecule";

function FormLogin ({ open, onClose, title, handleSubmit }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <LoginFormMolecule handleSubmit={handleSubmit} />
      </ModalForm>
    </>
  );
};

export default FormLogin;
