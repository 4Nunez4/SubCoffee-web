// Textarea.jsx
import React from 'react';

const Textarea = ({ placeholder }) => {
  return (
    <textarea className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500" placeholder={placeholder}></textarea>
  );
};

export default Textarea;
