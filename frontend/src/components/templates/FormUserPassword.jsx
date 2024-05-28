import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import UpdateUserPasswordMolecule from "../molecules/UpdateUserPasswordMolecule";
import { useAuthContext } from "../../context/AuthContext";

function FormUserPassword ({ open, onClose, title, titleBtn }) {
  const { cerrarModal, setCerrarModal } = useAuthContext();

  useEffect(() => {
    if (cerrarModal) {
      onClose();
      setCerrarModal(false);
    }
  }, [cerrarModal, onClose, setCerrarModal]);
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <UpdateUserPasswordMolecule onClose={onClose} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormUserPassword