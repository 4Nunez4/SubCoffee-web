import React from "react";
import { icono } from "./IconsAtom";

function ButtonCerrarModalAtom({ onClose }) {
  return (
    <button
      className="absolute top-0 right-4 text-grisMedio3 hover:text-naranjaSena focus:outline-none"
      onClick={onClose}
    >
      <icono.iconoequis className="text-3xl" />
    </button>
  );
}

export default ButtonCerrarModalAtom;
