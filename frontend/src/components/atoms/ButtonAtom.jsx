import React from "react";

const ButtonAtom = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 border border-gray-400 bg-gray-200 w-auto text-gray-500 rounded-md hover:bg-gray-400 transition-all ease-in-out hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default ButtonAtom;