import React from "react";
import TitleForModal from "../atoms/TitleForModal";
import ModalVariedadMolecule from "../molecules/ModalVariedadMolecule";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";
import LinkAtom from "../atoms/LinkAtom";

function VariedadPageOrganism({ onClose }) {
  return (
    <>
      <TitleForModal>Registrar Variedad</TitleForModal>
      <ModalVariedadMolecule onClose={onClose} />
      <ButtonVolverAtom>
        ¿No quieres crear una Variedad?
        <LinkAtom to="/subcoffee">Volver</LinkAtom>
      </ButtonVolverAtom>
    </>
  );
}

export default VariedadPageOrganism;
