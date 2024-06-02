import React from "react";
import { Link } from "react-router-dom";

const LinkButtonAtom = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#00ed64] hover:text-[#001e2b] transition-all ease-in-out duration-500"
    >
      {children}
    </Link>
  );
};

export default LinkButtonAtom;
