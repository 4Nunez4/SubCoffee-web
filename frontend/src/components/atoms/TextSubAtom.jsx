import React from "react";
import { Link } from "react-router-dom";

function TextSubAtom({ to, color, text }) {
  return (
    <Link to={to} className={`text-${color}  font-semibold text-2xl duration-200`}>
      {text}
    </Link>
  );
}

export default TextSubAtom;
