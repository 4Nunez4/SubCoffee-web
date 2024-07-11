import React from "react";

const AvatarAtom = ({ img, className }) => {
  return (
    <div className="cursor-pointer">
      <img
        src={`./src/assets/${img}`}
        alt="Photo"
        className={`h-11 w-11 mr-2 rounded-full  ${className}`}
      />
    </div>
  );
};

export default AvatarAtom;