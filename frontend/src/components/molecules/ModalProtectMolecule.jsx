import React from "react";
import { icono } from "../atoms/IconsAtom";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

function ModalProtectMolecule({ volver }) {
  return (
    <div className="bg-white rounded-xl flex flex-col justify-center items-center w-44 p-2 text-sm m-2">
      <icono.iconoInterrogation className="text-red-600 mb-2 w-32 h-32" />
      <p className="mb-4 text-black font-semibold text-center">
        Woow, no puedes ingresar porque no has iniciado sesión.
      </p>
      <Link to="/" className="w-full">
        <Button
          className="bg-red-600 text-white hover:bg-red-500 w-full rounded-lg"
          onClick={volver}
        >
          Cerrar sesión
        </Button>
      </Link>
    </div>
  );
}

export default ModalProtectMolecule;
