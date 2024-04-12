import React from "react";
import { Link } from "react-router-dom";

const FooterLinkAtom = ({ to, children }) => (
  <Link to={to} className="text-grisMedio2 hover:text-negro transition duration-300 ease-in-out">
    {children}
  </Link>
);

export default FooterLinkAtom