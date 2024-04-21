import React from "react";
import { ModalForm } from "./ModalForm";
import RegisterUser from "../molecules/RegisterUser"

function FormUserOrganism ({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
      <ModalForm open={open} onClose={onClose}>
        <RegisterUser initialData={initialData} mode={mode} handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </ModalForm>
    </>
  );
};

export default FormUserOrganism