import React from 'react'

function ButtonTabAtom({ onClick, active, text, color }) {
    return (
      <button
        onClick={onClick}
        className={`focus:outline-none ${
          active ? `border-b-2 border-${color}-500` : "border-b"
        } text-gray-400 px-4 py-2`}
      >
        {text}
      </button>
    );
  };

export default ButtonTabAtom