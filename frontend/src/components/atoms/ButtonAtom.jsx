import React from "react";

const ButtonAtom = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 bg-verdeSena1 w-auto text-blanco rounded-md hover:bg-verdeSena2 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default ButtonAtom;