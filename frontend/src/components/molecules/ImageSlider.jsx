import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImagenSliderOne = "/imageSliderOne.png";
const ImagenSliderTwo = "/imageSliderTwo.png";
const ImagenSliderThree = "/imageSliderThree.png";

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
    }, 10000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div>
      <div className="max-w-[1600px] h-auto w-full m-auto pt-10 p-4 bg-[#FDFBF6]">
        <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
          <div
            className="w-full h-full bg-center bg-cover duration-500"
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          ></div>
        <div className="absolute inset-0 flex items-center justify-center text-center bg-[#061621] bg-opacity-70 ">

        <div className=" flex flex-col items-center justify-center">
              <div className="bg-[#82828286] h-4/5 w-4/5 rounded-lg flex justify-center items-center text-lg font-medium ">
                <div className=" w-3/4 h-auto ">
                  <div className="text-center text-[#FDFBF6] ">
                    <h1 className="text-5xl font-bold mb-4">
                      Bienvenido a Sub
                      <span className="text-[#39A800]">Coffee</span>
                    </h1>
                    <p className=" py-4">
                      Una plataforma online donde te podrás conectar con
                      diferentes usuarios para subastar y pujar por café de alta
                      calidad. Solicita tu registro a esta gran familia ya
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        <div className="flex justify-center mt-4 ">
          <div className="flex justify-center items-center transition duration-300 ">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-[#00ed64]" : "bg-[#061621]"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
