import React from "react";

function ImageSliderAtom({ src, alt }) {
  return <img src={src} alt={alt} className="rounded-2xl w-full aspect-auto" />;
}

export default ImageSliderAtom;
