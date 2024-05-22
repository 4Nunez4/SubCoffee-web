import React from "react";
import { Link } from "react-router-dom";

const LinkButtonAtom = ({ to, children }) => {
  return (
    <Link
      to={to}
      className=" text-center py-2 px-4 bg-[#009100] w-auto text-gray-100 rounded-md hover:bg-[#e0e0e0] hover:text-[#009100] transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </Link>
  );
};

export default LinkButtonAtom;
