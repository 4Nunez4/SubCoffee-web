import React from "react";
import ButtonAtom from "../atoms/ButtonAtom";

const ConfigButtonGroupMolecule = ({ buttons }) => {
  return (
    <div className="flex flex-col">
      {buttons.map((button, index) => (
        <ButtonAtom key={index} text={button.text} onClick={button.onClick} />
      ))}
    </div>
  );
};

export default ConfigButtonGroupMolecule;
