import React from "react";
import { Link } from "react-router-dom";

const LinkButtonAtom = ({ to, children }) => {
  return (
    <Link
      to={to}
      className=" text-center py-2 px-4 bg-gray-300 w-full text-gray-500 rounded-md hover:bg-gray-400 hover:text-gray-200 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </Link>
  );
};

export default LinkButtonAtom;
