import React from 'react'

function ButtonAtomFull({ onClick, children, color, colorHover }) {
    return (
      <button
        onClick={onClick}
        className={`py-2 px-4 ${color} w-full text-blanco rounded-md hover:${colorHover} focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        
        {children}
      </button>
    );
  };

export default ButtonAtomFull