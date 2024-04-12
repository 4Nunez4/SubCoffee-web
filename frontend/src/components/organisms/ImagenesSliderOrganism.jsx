import React from "react";
import ImageSliderMolecule from "../molecules/ImageSliderMolecule";

function ImagenesSliderOrganism() {
  const images = [
    "./src/assets/cafe1.jpg",
    "./src/assets/cafe1.jfif",
    "./src/assets/cafe3.jfif",
  ];

  return (
    <div className="flex w-full justify-center">
      <ImageSliderMolecule images={images} />
    </div>
  );
}

export default ImagenesSliderOrganism;
