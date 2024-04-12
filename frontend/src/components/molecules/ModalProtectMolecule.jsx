import React from "react";
import ButtonAtomFull from "../atoms/ButtonAtomFull";
import { icono } from "../atoms/IconsAtom";
import { Link } from "react-router-dom";

function ModalProtectMolecule({ volver }) {
  return (
    <div className="bg-blanco rounded-xl flex flex-col justify-center items-center w-44 p-2 text-sm m-2">
      <icono.iconoInterrogation className="text-rojo mb-2 w-32 h-32" />
      <p className="mb-4 text-grisOscuro font-semibold text-center">
        Woow, no puedes ingresar porque no has iniciado sesión. 
      </p>
      <Link to="/" className="w-full">
        <ButtonAtomFull
          onClick={volver}
          color="verdeSena1"
          colorHover="verdeSena2"
        >
          Volver
        </ButtonAtomFull>
      </Link>
    </div>
  );
}

export default ModalProtectMolecule;
