import React from "react";
import { Link } from "react-router-dom";

const LinkAtom = ({ to, children }) => {
  return (
    <Link to={to} className="text-xs text-left underline hover:text-naranjaSena text-grisMedio3">
      {children}
    </Link>
  );
};

export default LinkAtom;