import React, { useEffect } from "react";
import RegisterSubastaMolecule from "../molecules/RegisterSubastaMolecule";
import { useSubastaContext } from "../../context/SubastaContext";
import { ModalFormXl } from "../organisms/ModalFormXl";

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
      <ModalFormXl open={open} onClose={onClose} title={title}>
        <RegisterSubastaMolecule onClose={onClose} mode={mode} titleBtn={titleBtn} />
      </ModalFormXl>
    </>
  );
};

export default FormSubasta