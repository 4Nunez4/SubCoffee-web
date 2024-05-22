import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterFincaMolecule from "../molecules/RegisterFincaMolecule";
import { useFincaContext } from "../../context/FincaContext";

function FormFinca ({ open, onClose, title, titleBtn, mode }) {

  const { cerrarModal, serCerrarModal } = useFincaContext()

  useEffect(() => {
    if (cerrarModal) {
      onClose();
      serCerrarModal(false);
    }
  }, [cerrarModal, onClose, serCerrarModal]);

  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterFincaMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormFinca