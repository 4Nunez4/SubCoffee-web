import React from "react";

const TextAtom = ({ className, children }) => {
  return <p className={`text-grisMedio3 ${className}`}>{children}</p>;
};

export default TextAtom;
