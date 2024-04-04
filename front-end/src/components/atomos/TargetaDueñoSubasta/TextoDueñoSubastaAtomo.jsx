import React from 'react';

const TextAtom = ({ children, className }) => {
  return <div className={`text-center place-content-center  text-xl font-semibold ${className}`}>{children}</div>;
};

export default TextAtom;