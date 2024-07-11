import React from 'react';

function QuienesSomosA() {
  return (
    <div className="mt-24 flex justify-center  bg-[#FDFBF6] w-full h-full">
    <div className='flex flex-row justify-between px-12 py-8'> 
      <div className='w-1/2 order-last m-2'> 
        <img src="./src/assets/ImagenesIndex/quienes.jpeg" alt="" className='h-full rounded-lg' />
      </div>
      <div className='w-1/2 order-first p-2'> 
        <h1 className="font-semibold text-3xl mb-4">Quiénes Somos</h1>
        <p className="mb-4 font-normal text-lg text-[#919190]">Somos una plataforma en línea especializada en la subasta de café de alta calidad. Nos dedicamos a conectar a productores de café excepcionales con consumidores apasionados que buscan la mejor experiencia en cada taza.</p>
        <p className="mb-4 font-normal text-lg text-[#919190]">En nuestra plataforma, los productores tienen la oportunidad de mostrar su trabajo artesanal y sus procesos de cultivo únicos, mientras que los compradores pueden descubrir una amplia variedad de cafés selectos y realizar ofertas para adquirirlos.</p>
        <p className="mb-4 font-normal text-lg text-[#919190]">Nuestro objetivo es promover la transparencia en la industria del café, fomentar relaciones comerciales justas y brindar una experiencia excepcional a todos los amantes del café, desde los productores hasta los consumidores finales.</p>
      </div>
    </div>
  </div>
    
  )
}

export default QuienesSomosA;
