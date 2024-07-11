import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import LoginFormMolecule from "../molecules/LoginFormMolecule";

function FormLogin ({ open, onClose, title }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <LoginFormMolecule onClose={onClose} />
      </ModalForm>
    </>
  );
};

export default FormLogin;
