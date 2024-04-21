import React from "react";
import { Link } from "react-router-dom";

const FooterLinkAtom = ({ to, children }) => (
  <Link to={to} className="text-gray-500 hover:text-black transition duration-300 ease-in-out">
    {children}
  </Link>
);

export default FooterLinkAtom