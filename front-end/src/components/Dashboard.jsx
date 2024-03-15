import logo from '../assets/cafe-pergamino.dashboard.jpg';
import cafe from '../assets/cafe-dashboard-2.jpg'

function Dashboard() {
 
  return (
      <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white mx-auto w-11/12 md:w-3/4 lg:w-4/5 xl:w-11/12 2xl:w-5/6 h-5/6 ">
              <img className="w-full h-full object-cover rounded-t-3xl pb-8 "src={logo}  />

          <div className="flex flex-wrap justify-center items-center my-12 mx-4">

                <div className="w-full md:w-1/2 p-8 ">
                    <h2 className="text-3xl font-semibold mb-4">Conectando Campesinos con el Mundo</h2>
                        <p className="mb-4">En SubCoffe, creemos en el valor de conectar directamente a los campesinos colombianos con amantes del café alrededor del mundo. A través de nuestra plataforma de subastas, garantizamos un precio justo para quienes cultivan y un café de calidad excepcional para ti.</p>
                        
                        <button  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Explora las Subastas</button>
                    
            </div>
  
                 <div className="w-screen md:w-1/2 pl-60">
                           <img src={cafe} className="rounded-lg shadow-lg" />
             </div>
     
       <div className="w-full md:w-98 pt-28 ">
               <h2 className="text-xl font-bold mb-4">Prácticas de SubCoffe</h2>
                  <div className="grid grid-cols-2 gap-4">
   
                           <div className="bg-white p-4 rounded ">
                              <h3 className="text-lg font-semibold mb-2">Transparencia en la cadena de suministro</h3>
                                 <p>Ofrecemos información detallada sobre el origen y la producción del café para garantizar transparencia y confianza.</p>
                                 <button  className="border border-cyan-400 hover:bg-gray-200 text-cyan-500 font-semibold py-1 px-1 rounded m-5 ">Explora las Subastas</button>
                           </div>
      
                     <div className="bg-white p-4 rounded ">
                            <h3 className="text-lg font-semibold mb-2">Educación sobre el café</h3>
                                 <p>Aprendizaje accesible sobre granos, métodos de cultivo y preparación para mejorar la apreciación del café.</p>
                                 <button  className="border border-cyan-400 hover:bg-gray-200 text-cyan-500 font-semibold py-1 px-1 rounded m-5 ">Explora las Subastas</button>
                     </div>
     
                     <div className=" bg-white p-4 rounded ">
                            <h3 className="text-lg font-semibold mb-2">Compromiso comunitario</h3>
                                 <p>Apoyamos a los productores con precios justos, capacitación y desarrollo para fortalecer la comunidad cafetalera.</p>
                                 <button  className="border border-cyan-400 hover:bg-gray-200 text-cyan-500 font-semibold py-1 px-1 rounded m-5 ">Explora las Subastas</button>
                     </div>
     
                     <div className="bg-white p-4 rounded ">
                           <h3 className="text-lg font-semibold mb-2">Experiencia del usuario centrada en el cliente</h3>
                                 <p>Diseño intuitivo, opciones claras y proceso de compra seguro para una experiencia de usuario excepcional.</p>
                                 <button  className="border border-cyan-400 hover:bg-gray-200 text-cyan-500 font-semibold py-1 px-1 rounded m-5 ">Explora las Subastas</button>
                     </div>
                 </div>
        </div>


        <div className="w-full md:w-48 pt-28 bg-black  ">
          <h2 className='text-xl font-bold justify-center '>Subasta la variedad de Café de tu gusto</h2>
            <div className='grid grid-cols-2 gap-4'>

              
            <div className="bg-white p-4 rounded ">
                              <h3 className="text-lg font-semibold mb-2">Transparencia en la cadena de suministro</h3>
                                 <img src="" alt="" />
                                 
                           </div>
            <div className="bg-white p-4 rounded ">
               <h3 className="text-lg font-semibold mb-2">Transparencia en la cadena de suministro</h3>
                  <img src="" alt="" />
                  
            </div>
            <div className="bg-white p-4 rounded ">
               <h3 className="text-lg font-semibold mb-2">Transparencia en la cadena de suministro</h3>
                  <img src="" alt="" />
                  
            </div>
            <div className="bg-white p-4 rounded ">
               <h3 className="text-lg font-semibold mb-2">Transparencia en la cadena de suministro</h3>
                  <img src="" alt="" />
                  
            </div>
              
            </div>

        </div>
    </div>
  </div>
</div>


  


  );
}

export default Dashboard;
