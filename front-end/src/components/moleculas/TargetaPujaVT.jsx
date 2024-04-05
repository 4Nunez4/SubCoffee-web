import React from 'react';
import SliderAtom from '../atomos/TargetaPujaIncremento/EstiloRangoSlider';

const CardMolecule = ({ amount, handleSliderChange }) => {
  return (
    <div className="w-full h-full bg-blue-500 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">2 yo</p>
          <p className="text-xl font-semibold">${amount}</p>
        </div>
        <SliderAtom value={amount} onChange={handleSliderChange} />
        <p className="text-center mt-4">aumentar + ${amount + 0}</p>
      </div>
    </div>
  );
};

export default CardMolecule;