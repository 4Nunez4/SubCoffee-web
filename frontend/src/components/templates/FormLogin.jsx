import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import LoginFormMolecule from "../molecules/LoginFormMolecule";

function FormLogin ({ open, onClose, title }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <LoginFormMolecule />
      </ModalForm>
    </>
  );
};

export default FormLogin;
