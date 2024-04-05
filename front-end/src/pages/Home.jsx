import React, {useState} from "react"
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import FootPagelIMG from "../assets/footPageIMG.png"

function Home(){

    const slides = [

    {
      url: 'https://www.semana.com/resizer/LgNm70jTor0z_IKrwZmx8bvlMEY=/arc-anglerfish-arc2-prod-semana/public/MGSRCROCY5GETHHQC2XBMM2CEQ.jpg',
    },
    {
      url: 'https://cdn-3.expansion.mx/dims4/default/3a43bc7/2147483647/strip/true/crop/5760x3840+0+0/resize/1800x1200!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fd3%2Fa1%2Fca36469448dea0b9dde50db5451f%2Fbeneficios-cafe.jpg',
    },

    {
      url: 'https://www.solucionesparaladiabetes.com/magazine-diabetes/wp-content/uploads/cafe-696x464.jpeg',
    },

    ];

    const [currentIndex,setCurrentIndex] = useState(0);
    const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length-1 : currentIndex-1;
    setCurrentIndex(newIndex)

  }
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const gotoNextSlide = (id) => {
    setCurrentIndex(id)
  }

    return(
       
     <div className="max-w-[1600px] h-[600px] w-full m-auto py-10 px-4 relative group">
      <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="w-full h-full rounded-2xl bg-center bg-cover duration-500">
      </div>

      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl text-bold rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
        <FaChevronLeft  onClick={prevSlide} size={33}/>
      </div>
      
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl text-bold rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
        <FaChevronRight onClick={nextSlide} size={33}t/>
      </div>

        <div className="flex justify-center items-center py-2 top-4">
        {slides.map((slide,index) => (
          <div key={index} onClick={()=>gotoNextSlide(index)}>
          </div>
        ))}

      </div>

        <p className ="flex flex-col ustify-center items-center font-black text-2xl font-sans">¡Bienvenido a SubCoffee, donde cada grano de cafe cuenta!</p> 

      <>
        <h1 className="font-medium flex-row font-black text-2xl font-sans">Subasta</h1>
        <div className="flex flex-col w-12 h-12">
          <div>
            <img src={FootPagelIMG} alt="FootPagelIMG" />
            <div>
            <label />
            </div>
          </div>
        </div>


        <h1 className="font-medium flex-row font-black text-2xl font-sans">Arabico</h1>

      </>  

          </div>
)}

//slidesmini



export default Home