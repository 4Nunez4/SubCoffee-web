import React from "react";
import LinkAtom from "../atoms/LinkAtom";
import RegisterFormMolecule from "../molecules/RegisterFormMolecule";
import TitleForModal from "../atoms/TitleForModal";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";

const RegisterPageOrganism = ({ onClose }) => {
  return (
    <>
      <TitleForModal>Registrarse</TitleForModal>
      <RegisterFormMolecule onClose={onClose} />
      <ButtonVolverAtom>
        ¿Ya tienes una cuenta?
        <LinkAtom to="/">Iniciar sesión</LinkAtom>
      </ButtonVolverAtom>
    </>
  );
};

export default RegisterPageOrganism;
