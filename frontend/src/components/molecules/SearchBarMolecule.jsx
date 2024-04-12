import React from "react";
import EmptyInputAtom from "../atoms/EmptyInputAtom";
import { icono } from "../atoms/IconsAtom";

function SearchBarMolecule({ onClick }) {
  return (
    <button className="relative" onClick={onClick}>
      <icono.iconoBuscar className="absolute top-3 left-3 text-gray-400" />
      <EmptyInputAtom type="text" placeholder="¿Qué estás buscando?" />
      <icono.iconoBuscarForDates className="absolute top-3 right-3 text-gray-400" />
    </button>
  );
}

export default SearchBarMolecule;
