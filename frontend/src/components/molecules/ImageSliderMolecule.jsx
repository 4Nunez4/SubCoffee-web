import React, { useEffect, useState } from "react";
import SliderControlAtom from "../atoms/SliderControlAtom";
import ImageSliderAtom from "../atoms/ImageSliderAtom";

function ImageSliderMolecule({ images }) {
  const [imagenTiempo, setImagenTiempo] = useState(0);

  useEffect(() => {
    const validarImagen = setInterval(() => {
      setImagenTiempo((img) => (img + 1) % images.length);
    }, 5000);
    return () => clearInterval(validarImagen);
  }, [images.length]);

  const nextImage = () => {
    setImagenTiempo((imagenTiempo + 1) % images.length);
  };

  const prevImage = () => {
    setImagenTiempo((imagenTiempo - 1 + images.length) % images.length);
  };
  return (
    <div className=" w-full md:w-2/3 mx-auto">
      <div className="w-full h-[60vh] overflow-hidden rounded-2xl">
        <ImageSliderAtom src={images[imagenTiempo]} alt="Imagenes de slider" />
      </div>
      <SliderControlAtom onClick={prevImage} direction="left-2" />
      <SliderControlAtom onClick={nextImage} direction="right-2" />
    </div>
  );
}
export default ImageSliderMolecule;
