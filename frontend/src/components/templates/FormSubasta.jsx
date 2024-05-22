import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterSubastaMolecule from "../molecules/RegisterSubastaMolecule";
import { useSubastaContext } from "../../context/SubastaContext";

function FormSubasta ({ open, onClose, title, titleBtn, mode }) {

  const { cerrarModal, serCerrarModal } = useSubastaContext()

  useEffect(() => {
    if (cerrarModal) {
      onClose();
      serCerrarModal(false);
    }
  }, [cerrarModal, onClose, serCerrarModal]);

  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterSubastaMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormSubasta