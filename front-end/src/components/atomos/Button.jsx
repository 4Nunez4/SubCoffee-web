// Button.jsx
import React from 'react';

const Button = ({ children, variant = "" }) => {
  return (
    <button className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ${variant === "outline" ? "border border-blue-600" : ""}`}>
      {children}
    </button>
  );
};

export default Button;
