import React, { useEffect, useState } from "react";

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
    <div className="max-w-[1600px] h-[350px]  w-full m-auto pt-10 p-4 bg-[#FDFBF6]">
      <div className="relative w-full h-[270px] rounded-lg overflow-hidden">
        <div
          className="w-full h-4/5 bg-center bg-cover duration-500 rounded-lg"
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        ></div>
      <div className="absolute inset-0 flex items-center h-4/5 justify-center text-center bg-[#181818] bg-opacity-70  rounded-lg">

      <div className=" flex flex-col items-center justify-center">
            <div className="bg-[#82828286] h-5/6 w-4/5 rounded-lg flex justify-center items-center text-lg font-medium ">
              <div className=" w-3/4 h-auto ">
                <div className="text-center text-[#FDFBF6] ">
                  <h1 className="text-5xl font-bold mb-4">
                    Bienvenido a Sub
                    <span className="text-[#39A800]">Coffee</span>
                  </h1>
                  <p className=" py-4">
                    Una plataforma online donde te podrás conectar con
                    diferentes usuarios para subastar y pujar por café de alta
                    calidad. Empieza a subastar ya
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
      <div className="">
        <div className="flex justify-center items-center transition duration-300 ">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-2 h-2 mx-2 rounded-lg cursor-pointer ${
                index === currentIndex ? "bg-[#39A800]" : "bg-[#A6D290]"
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
