import React from "react";
import SubastaFormMolecule from "../molecules/SubastaFormMolecule";
import LinkAtom from "../atoms/LinkAtom";
import TitleForModal from "../atoms/TitleForModal";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";

function SubastaFormPageOrganism() {
  return (
    <>
      <TitleForModal>Crear subasta</TitleForModal>
      <SubastaFormMolecule />
      <ButtonVolverAtom>
        ¿No quieres crear una subasta?
        <LinkAtom to="/">Volver</LinkAtom>
      </ButtonVolverAtom>
    </>
  );
}

export default SubastaFormPageOrganism;
