// AvatarImage.jsx
import React from 'react';

const AvatarImage = ({ src, alt }) => {
  return (
    <img className="w-12 h-12 rounded-full object-cover" src={src} alt={alt} />
  );
};

export default AvatarImage;
