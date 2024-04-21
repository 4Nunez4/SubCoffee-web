import React, { useState } from "react";
import ModalDeInterrogacion from "./ModalInterroMolecule";
import LinkButtonAtom from "../atoms/LinkButtonAtom";
import ButtonAtomFull from "../atoms/ButtonAtomFull";

function ModalLogoutMolecule() {
  const [mostrarAviso, setMostrarAviso] = useState(false);

  const handleCerrarSesion = () => {
    setMostrarAviso(!mostrarAviso);
  };

  return (
    <div className="bg-white rounded-xl flex flex-col justify-center items-center w-52 border border-grisOscuro shadow-md p-2 text-sm gap-y-2">
      <LinkButtonAtom to="/profile">Perfil</LinkButtonAtom>
      <ButtonAtomFull onClick={handleCerrarSesion} color="verdeSena1" colorHover="verdeSena2">
        Cerrar sesión
      </ButtonAtomFull>
      {mostrarAviso && (
        <ModalDeInterrogacion onClose={() => setMostrarAviso(false)} />
      )}
    </div>
  );
}

export default ModalLogoutMolecule;
