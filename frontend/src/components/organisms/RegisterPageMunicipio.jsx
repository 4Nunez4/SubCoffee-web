import React from "react";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";
import RegisterMunicipioMolecule from "../molecules/RegisterMunicipioMolecule";

const RegisterPageMunicipio = ({ onClose, mode, userId }) => {
  return (
    <>
      <RegisterMunicipioMolecule
        onClose={onClose}
        mode={mode}
        userId={userId}
      />
      <ButtonVolverAtom />
    </>
  );
};

export default RegisterPageMunicipio;
