import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterUser from "../molecules/RegisterUser"

function FormUserOrganism ({ open, onClose, title, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterUser initialData={initialData} mode={mode} title={title} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormUserOrganism