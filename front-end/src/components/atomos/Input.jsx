// Input.jsx
import React from 'react';

const Input = ({ placeholder, type = "text" }) => {
  return (
    <input className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500" type={type} placeholder={placeholder} />
  );
};

export default Input;
