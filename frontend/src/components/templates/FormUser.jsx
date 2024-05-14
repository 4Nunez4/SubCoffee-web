import React from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterUser from "../molecules/RegisterUser"

function FormUser ({ open, onClose, title, onCloseModal, titleBtn, idUser, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterUser idUser={idUser} onCloseModal={onCloseModal} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormUser