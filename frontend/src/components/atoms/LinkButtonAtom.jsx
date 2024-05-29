import React from "react";
import { Link } from "react-router-dom";

const LinkButtonAtom = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center py-2 px-4 bg-[#009100] text-gray-100 font-semibold rounded-md hover:bg-[#e0e0e0] hover:text-[#009100] transition-all ease-in-out duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007bff]"
    >
      {children}
    </Link>
  );
};

export default LinkButtonAtom;
