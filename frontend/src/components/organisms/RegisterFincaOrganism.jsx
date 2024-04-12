import React from "react";
import LinkAtom from "../atoms/LinkAtom";
import ModalFincaMolecule from "../molecules/ModalFincaMolecule";
import TitleForModal from "../atoms/TitleForModal";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";

function RegisterFincaOrganism({onClose}) {
  return (
    <>
      <TitleForModal>Registrar finca</TitleForModal>
      <ModalFincaMolecule onClose={onClose} />
      <ButtonVolverAtom>
        ¿No quieres crear una finca?
        <LinkAtom to="/subcoffee">Volver</LinkAtom>
      </ButtonVolverAtom>
    </>
  );
}

export default RegisterFincaOrganism;
