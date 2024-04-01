// ButtonGridOrganism.jsx
import React from 'react';
import ButtonWithIconMolecule from '../moleculas/BotonesSubastaMolecula';

import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { LuBadgeCheck } from "react-icons/lu";

const ButtonGridOrganism = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 text-white bg-blue-800">
      <ButtonWithIconMolecule icon={<IoChatbubbleEllipsesSharp />} text="Chatear" />
      <ButtonWithIconMolecule icon={<FaTrashCan />} text="Eliminar" />
      <ButtonWithIconMolecule icon={<HiUserGroup />} text="Continuar" />
      <ButtonWithIconMolecule icon={<LuBadgeCheck />} text="Finalizar" />
    </div>
  );
};

export default ButtonGridOrganism;
