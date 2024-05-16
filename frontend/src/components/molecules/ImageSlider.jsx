import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ImagenSliderOne from "../../../public/imageSliderOne.png";
import ImagenSliderTwo from "../../../public/imageSliderTwo.png";
import ImagenSliderThree from "../../../public/imageSliderThree.png";

function ImageSlider() {
  const slides = [
    { url: ImagenSliderOne },
    { url: ImagenSliderTwo },
    { url: ImagenSliderThree },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div>
      <div className="max-w-[1600px] h-auto w-full m-auto pt-10 p-4">
        <div
          className="w-full h-96 rounded-2xl bg-center bg-cover duration-500"
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        ></div>
        <div className="flex justify-center">
          {/* <div className="text-2xl text-bold rounded-full p-2 text-gray-700 cursor-pointer transition duration-300" onClick={prevSlide} >
            <FaChevronLeft size={25} />
          </div> */}
          <div className="flex justify-center items-center my-4 transition duration-300">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-[#009100]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
          {/* <div className="text-2xl text-bold rounded-full p-2 text-gray-700 cursor-pointer transition duration-300" onClick={nextSlide} >
            <FaChevronRight size={25} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
