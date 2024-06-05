import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterUser from "../molecules/RegisterUser"
import { useAuthContext } from "../../context/AuthContext";

function FormUser ({ open, onClose, title, titleBtn, mode }) {
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
        <RegisterUser mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormUser