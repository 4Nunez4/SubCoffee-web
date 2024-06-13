import React from "react";
import { Link } from "react-router-dom";

const FooterLinkAtom = ({ to, children }) => (
  <Link to={to} className=" text-[#FDFBF6] text-base">
    {children}
  </Link>
);

export default FooterLinkAtom