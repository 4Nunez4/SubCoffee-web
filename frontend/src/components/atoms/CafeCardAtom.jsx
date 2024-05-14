import React from "react";

const CafeCardAtom = ({ title, img }) => (
  <div 
    className="relative bg-gray-300 text-gray-500 rounded-lg p-4 w-80 h-52 transition-all duration-300 hover:scale-105 cursor-default flex flex-col items-center"
    style={{ backgroundImage: `url(./src/assets/${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="absolute inset-0 flex justify-center items-center">
      <p className="font-semibold text-sm text-center w-28 bg-slate-200 rounded-xl py-1">{title}</p>
    </div>
  </div>
);

export default CafeCardAtom;
