import React from 'react';

function QueremosLograr() {
  return (
    <div className="mt-24 flex justify-center  bg-[#FDFBF6] w-full h-full">
    <div className='flex flex-row justify-between px-12 py-8'> 
      <div className='w-1/2 order-last m-2'> 
        <img src="./src/assets/ImagenesIndex/queremos.jpeg" alt="" className='h-full rounded-lg' />
      </div>
      <div className='w-1/2 order-first p-2'> 
        <h1 className="font-semibold text-3xl mb-4">Queremos logar!</h1>
        <p className="mb-4 font-normal text-lg text-[#919190]">Lo que buscamos lograr con SubCoffee va más allá de simplemente conectar a los cafeteros con grandes compradores de café; nuestro objetivo es crear un ecosistema sostenible y transparente que fortalezca las relaciones entre productores y consumidores finales de café. SubCoffee no es solo una plataforma digital; es una comunidad dedicada a promover la excelencia en el café, apoyando a los pequeños productores y asegurando que sus esfuerzos sean reconocidos y valorados en el mercado global.</p>

        <p className="mb-4 font-normal text-lg text-[#919190]">Facilitamos una conexión directa entre los cafeteros y los grandes compradores de café, eliminando intermediarios y reduciendo costos. Esto permite a los productores recibir un precio justo por su trabajo y a los consumidores acceder a productos de alta calidad a precios competitivos.</p> 
        

      </div>
    </div>
  </div>
    
  )
}

export default QueremosLograr;