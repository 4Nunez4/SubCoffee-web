import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterMunicipioMolecule from "../molecules/RegisterMunicipioMolecule";
import { useMunicipioContext } from "../../context/MunicipioContext";

function FormMunicipio ({ open, onClose, title, titleBtn, mode }) {
  const { cerrarModal, setCerrarModal } = useMunicipioContext();
  useEffect(() => {
    if (cerrarModal) {
      onClose();
      setCerrarModal(false);
    }
  }, [cerrarModal, onClose, setCerrarModal]);

  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title}>
        <RegisterMunicipioMolecule mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormMunicipio