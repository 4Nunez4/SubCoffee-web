import React from "react";

const AvatarAtom = ({ img, className }) => {
  return (
    <div>
      <img
        src={`./src/assets/${img}`}
        alt="Photo"
        className={`h-10 w-12 mr-2 rounded-full ${className} cursor-pointer duration-500`}
      />
    </div>
  );
};

export default AvatarAtom;
