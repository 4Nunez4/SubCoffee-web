import React from "react";
import ModaVariedadUser from "../Guard/VariedadUserTable";
import { ModalFormXl } from "../organisms/ModalFormXl";

function FormVariedadUser({ open, onClose, title, titleBtn, pkFinca }) {
  return (
    <>
      <ModalFormXl open={open} onClose={onClose} title={title}>
        <ModaVariedadUser titleBtn={titleBtn} pkFinca={pkFinca} />
      </ModalFormXl>
    </>
  );
};

export default FormVariedadUser