import React from "react";
import ButtonVolverAtom from "../atoms/ButtonVolverAtom";
import RegisterDepartMolecule from "../molecules/RegisterDepartMolecule";

const RegisterPageDepartamento = ({ onClose, mode, userId, }) => {
  return (
    <>
      <RegisterDepartMolecule onClose={onClose} mode={mode} userId={userId} />
      <ButtonVolverAtom />
    </>
  );
};

export default RegisterPageDepartamento;
