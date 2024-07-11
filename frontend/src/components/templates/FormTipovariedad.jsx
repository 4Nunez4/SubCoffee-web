import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterTipoVariMolecule from "../molecules/RegisterTipoVariMolecule"
import { useTipoVariContext } from "../../context/TipoVariContext";

function FormTipovariedad ({ open, onClose, title, titleBtn, mode }) {
  const { cerrarModal, setCerrarModal } = useTipoVariContext();
  useEffect(() => {
    if (cerrarModal) {
      onClose();
      setCerrarModal(false);
    }
  }, [cerrarModal, onClose, setCerrarModal]);

  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterTipoVariMolecule mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormTipovariedad