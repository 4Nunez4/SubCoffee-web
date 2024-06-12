import React, { useState } from "react";

const CafeCardAtom = ({ title, img, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  const handleClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div
      className="relative bg-gray-300 text-gray-500 rounded-lg p-4 w-70 h-52 transition-all duration-1000 hover:scale-105 cursor-pointer flex flex-col items-center"
      style={{
        backgroundImage: `url(./src/assets/${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <p className="font-semibold text-sm text-center w-28 bg-slate-200 rounded-xl py-1">
          {title}
        </p>
      </div>
      {showDescription && (
        <div className="absolute inset-0 bg-[#001e2b] bg-opacity-80 text-white flex items-center justify-center rounded-lg ">
          <p className="text-center">{description}</p>
        </div>
      )}
    </div>
  );
};

export default CafeCardAtom;
