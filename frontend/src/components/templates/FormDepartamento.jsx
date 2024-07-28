import React, { useEffect } from "react";
import { ModalForm } from "../organisms/ModalForm";
import RegisterDepartMolecule from "../molecules/RegisterDepartMolecule";
import { useDepartContext } from "../../context/DeparContext";

function FormDepartamento ({ open, onClose, title, titleBtn, mode }) {
  const { cerrarModal, setCerrarModal } = useDepartContext();
  useEffect(() => {
    if (cerrarModal) {
      onClose();
      setCerrarModal(false);
    }
  }, [cerrarModal, onClose, setCerrarModal]);
  
  return (
    <>
      <ModalForm open={open} onClose={onClose} title={title} >
        <RegisterDepartMolecule mode={mode} titleBtn={titleBtn} />
      </ModalForm>
    </>
  );
};

export default FormDepartamento