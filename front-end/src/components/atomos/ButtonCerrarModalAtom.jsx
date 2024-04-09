import React from "react";
import { icono } from "./IconsAtom";

function ButtonCerrarModalAtom({ onClose }) {
  return (
    <button
      className="absolute top-3 right-3 text-grisMedio3 hover:text-naranjaSena focus:outline-none"
      onClick={onClose}
    >
      <icono.iconoequis className="text-2xl" />
    </button>
  );
}

export default ButtonCerrarModalAtom;
