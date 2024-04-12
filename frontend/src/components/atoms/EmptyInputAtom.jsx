import React from "react";

function EmptyInputAtom({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="px-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}

export default EmptyInputAtom;
