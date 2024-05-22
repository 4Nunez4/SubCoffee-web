import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterVeredaMolecule from "../molecules/RegisterVeredaMolecule";
import { useVeredaContext } from "../../context/VeredaContext";

function FormVereda ({ open, onClose, title, titleBtn, mode }) {
  const { cerrarModal, setCerrarModal } = useVeredaContext();

  useEffect(() => {
    if (cerrarModal) {
      onClose();
      setCerrarModal(false);
    }
  }, [cerrarModal, onClose, setCerrarModal]);

  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterVeredaMolecule mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormVereda