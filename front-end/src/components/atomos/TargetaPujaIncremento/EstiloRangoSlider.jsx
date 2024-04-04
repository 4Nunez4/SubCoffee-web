import React from 'react';

const SliderAtom = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="5000000"
      step="1000"
      value={value}
      onChange={onChange}
      className="w-full bg-blue-800 appearance-none h-8 rounded-full"
    />
  );
};

export default SliderAtom;