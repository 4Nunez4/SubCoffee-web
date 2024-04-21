import React from "react";

const ButtonAtom = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 bg-gray-400 w-auto text-white rounded-md hover:bg-gray-500 duration-200 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default ButtonAtom;