import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import { useAuthContext } from "../../context/AuthContext";
import RecuperarPasswordUserLogin from "../molecules/RecuperarPasswordUserLogin";

function FormRecuperarPassword ({ open, onClose, title, titleBtn }) {
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
        <RecuperarPasswordUserLogin onClose={onClose} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormRecuperarPassword