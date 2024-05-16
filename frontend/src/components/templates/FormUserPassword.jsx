import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import UpdateUserPasswordMolecule from "../molecules/UpdateUserPasswordMolecule";

function FormUserPassword ({ open, onClose, title, titleBtn }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <UpdateUserPasswordMolecule onClose={onClose} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormUserPassword