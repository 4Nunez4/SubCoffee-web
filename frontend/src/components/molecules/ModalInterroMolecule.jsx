import React from "react";
import { icono } from "../atoms/IconsAtom";
import ButtonAtomFull from "../atoms/ButtonAtomFull";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ModalInterroMolecule() {
  const navigator = useNavigate();

  const logoutt = () => {
    localStorage.clear();
    navigator("/");
    toast.success("Cierre de sesión exitoso")
  };

  return (
    <div className="bg-blanco rounded-xl flex flex-col justify-center items-center border-gray-700 w-44 border shadow-md p-2 text-sm m-2">
      <icono.iconoInterrogation className="text-red-600 mb-2 w-32 h-32" />
      <p className="mb-4 text-gray-700 font-semibold">¿Estás seguro?</p>
      <ButtonAtomFull
        onClick={logoutt}
        text="white"
        color="red-500"
        colorHover="red-700"
      >
        Cerrar sesión
      </ButtonAtomFull>
    </div>
  );
}

export default ModalInterroMolecule;
