// Checkbox.js
import React from 'react';

const Checkbox = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
    </div>
  );
};

export default Checkbox;
