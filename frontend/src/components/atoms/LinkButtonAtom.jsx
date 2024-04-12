import React from "react";
import { Link } from "react-router-dom";

const LinkButtonAtom = ({ to, children }) => {
  return (
    <Link
      to={to}
      className=" text-center py-2 px-4 bg-verdeSena1 w-full text-blanco rounded-md hover:bg-verdeSena2 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </Link>
  );
};

export default LinkButtonAtom;
