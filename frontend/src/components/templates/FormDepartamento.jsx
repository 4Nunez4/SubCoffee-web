import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterDepartMolecule from "../molecules/RegisterDepartMolecule";
import { useDepartContext } from "../../context/DeparContext";

function FormDepartamento ({ open, onClose, title, titleBtn, mode }) {
  const { cerrarModal, serCerrarModal } = useDepartContext();

  useEffect(() => {
    if (cerrarModal) {
      onClose();
      serCerrarModal(false);
    }
  }, [cerrarModal, onClose, serCerrarModal]);
  
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <RegisterDepartMolecule mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormDepartamento