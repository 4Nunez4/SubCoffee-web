import React from 'react';
import './custom-styles.css';

const PujaSlider = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="5000000"
      step="1000"
      value={value}
      onChange={onChange}
      className="w-full appearance-none h-8 rounded-full"
    />
  );
};

export default PujaSlider;