import React from "react";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";
import RegisterVeredaMolecule from "../molecules/RegisterVeredaMolecule";

const RegisterPageVereda = ({ onClose, mode, userId }) => {
  return (
    <>
      <RegisterVeredaMolecule
        onClose={onClose}
        mode={mode}
        userId={userId}
      />
      <ButtonVolverAtom />
    </>
  );
};

export default RegisterPageVereda;
