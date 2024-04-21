import React from "react";
import { Link } from "react-router-dom";

const LinkButtonAtom = ({ to, children }) => {
  return (
    <Link
      to={to}
      className=" text-center py-2 px-4 bg-gray-400 w-full text-white rounded-md hover:bg-gray-500 transition-all ease-in focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </Link>
  );
};

export default LinkButtonAtom;
