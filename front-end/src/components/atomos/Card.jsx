// Card.jsx
import React from 'react';

export const CardTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>;
export const CardHeader = ({ children }) => <div className="px-4 py-2 bg-gray-800">{children}</div>;
export const CardContent = ({ children }) => <div className="p-4">{children}</div>;
export const CardFooter = ({ children }) => <div className="px-4 py-2 bg-gray-800 flex justify-between">{children}</div>;

const Card = ({ children }) => {
  return (
    <div className="bg-[#2D3748] text-white">
      {children}
    </div>
  );
};

export default Card;
