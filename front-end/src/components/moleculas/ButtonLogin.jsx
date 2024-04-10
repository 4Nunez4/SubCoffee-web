// Button.js
import React from 'react';

const ButtonLog = ({ disabled, onClick, children }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default ButtonLog;
