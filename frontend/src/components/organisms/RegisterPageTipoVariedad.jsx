import React from "react";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";
import RegisterTipoVariMolecule from "../molecules/RegisterTipoVariMolecule";

const RegisterPageTipoVariedad = ({ onClose, mode, userId }) => {
  return (
    <>
      <RegisterTipoVariMolecule
        onClose={onClose}
        mode={mode}
        userId={userId}
      />
      <ButtonVolverAtom />
    </>
  );
};

export default RegisterPageTipoVariedad;
