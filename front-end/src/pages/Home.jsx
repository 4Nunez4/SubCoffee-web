import React, { useEffect, useState } from "react"
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import FootPagelIMG from "../assets/footPageIMG.png";
import Navbar from "../components/Navbar"
import axios from 'axios';

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


  const baseURL = 'http://localhost:4000/subasta/listar'
   const[post, setPost] = useState(null)

  useEffect(() => {
    try {
      axios.get( baseURL, {
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwa19jZWR1bGFfdXNlciI6MTA4NDI1MTg4OSwibm9tYnJlX3VzZXIiOiJKdWFuIENhbWlsbyBSZWFscGUiLCJlbWFpbF91c2VyIjoianVhbkBnbWFpbC5jb20iLCJwYXNzd29yZF91c2VyIjoiMTIzNDU2Nzg5IiwiZGVzY3JpcGNpb25fdXNlciI6IlNveSB1biBjaGljbyBhbWlnYWJsZSIsImltYWdlbl91c2VyIjoiIiwidGVsZWZvbm9fdXNlciI6IjMxNTc4NzQ1OTMiLCJmZWNoYV9uYWNpbWllbnRvX3VzZXIiOiIyMDA1LTA2LTE3VDA1OjAwOjAwLjAwMFoiLCJyb2xfdXNlciI6ImFkbWluIiwiZXN0YWRvX3VzZXIiOm51bGx9XSwiaWF0IjoxNzEyODgzNzM3LCJleHAiOjE3MTI5NzAxMzd9.OWx0uLBUknBINFxn-VgjS-M86Cv5me8DdM2YWiYke3c"
        }
      }).then((response) => {
        console.log(response)
        setPost(response.data)
      })
    }
    catch(error){
        console.log("ERROR SERVIOR", error)
    }
  }, [])

  if(!post) return null


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

        <p className ="flex flex-col ustify-center items-center font-extrabold text-2xl font-sans">¡Bienvenido a SubCoffee, donde cada grano de cafe cuenta!</p> 



      <>
        <h1 className="font-medium flex flex-col text-2xl font-sans p-3">Borbón Rosado</h1>
        <div className= "flex flex-row py-5">
        <div className="flex flex-col w-96 h-96 px-2.5">
        <img className="flex flex-col w h-60 rounded" src={FootPagelIMG} alt="FootPagelIMG" />

       {post.map(subasta =>( 
        
            <label key={subasta.pk_id_sub} value={subasta.pk_id_sub} >
            {subasta.fecha_inicio_sub}
            </label>
            ))} 

            {/*<label>Fecha_inicio {post.fecha_inicio_sub}</label>
            <label>precio_inicial {post.precio_inicial_sub}</label>
            <label>estado {post.estado_sub}</label>
            <label>produccion {post.fk_id_produccion}</label>*/}

            <button className="bg-green-500"  onClick={() => setModalOpen(true)}>Ver Mas +</button>
          </div>
        </div>

      </>  
  </div>
)}

export default Home