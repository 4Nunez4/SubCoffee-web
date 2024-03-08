import React, {useState} from "react"
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

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
       
     <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group">
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

        <h2>Cafe Robusta Subastas </h2>

        </div>

 /* <div className="w-3/4 m-auto">
            <div className="mt-20">
                    {data.map((d) => (

                        <div className="bg-gray-400 h-[450px] text-black rounded-xl">

                            <div className="rounded-t-xl bg-white flex justify-center items-center bg-indigo-800">
                                <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
                            </div>

                            <div className="flex flex-col justify-center items-center gap-4 p-4">
                            <p className="text-txl">{d.name}</p>
                            <p>{d.review}</p>
                            </div>
                            <button className=" bg-indigo-500 text-white text-lg px-6 rounded-full">More button</button>
                        </div>
                    ))}
            </div>
        </div>

const data = [
    {
        name: `Cafe robusta`,
        img:`https://www.semana.com/resizer/LgNm70jTor0z_IKrwZmx8bvlMEY=/arc-anglerfish-arc2-prod-semana/public/MGSRCROCY5GETHHQC2XBMM2CEQ.jpg`,
        review: `Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsum`
    },

    {
        name: `Cafe robusta`,
        img:`../assets/imagenPrueba.webp`,
        review: `Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsum`
    },

    {
        name: `Cafe robusta`,
        img:`../assets/imagenPrueba.webp`,
        review: `Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsum`
    },

    {
        name: `Cafe robusta`,
        img: `../assets/imagenPrueba.webp`,
        review: `Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsum`
    },

    {
        name: `Cafe robusta`,
        img:`../assets/imagenPrueba.webp`,
        review: `Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsumipsumLorem ipsum`
    },

]   */
    )}

export default Home