import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterFincaMolecule from "../molecules/RegisterFincaMolecule";
import { useFincaContext } from "../../context/FincaContext";

function FormFinca ({ open, onClose, title, titleBtn, mode }) {
  const { cerrarModal, setCerrarModal } = useFincaContext()
  useEffect(() => {
    if (cerrarModal) {
      onClose();
      setCerrarModal(false);
    }
  }, [cerrarModal, onClose, setCerrarModal]);

  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterFincaMolecule mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormFinca