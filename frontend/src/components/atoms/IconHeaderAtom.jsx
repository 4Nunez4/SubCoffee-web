import React from "react";

function IconHeaderAtom({ onClick, children }) {
  return <button onClick={onClick} className="cursor-pointer text-blanco">{children}</button>;
}

export default IconHeaderAtom;
