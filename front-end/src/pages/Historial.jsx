import React, { useState } from 'react'
import '../css/Historial.css'
import { Link } from 'react-router-dom'

const Historial = (historial) => {
  const [subastaCreadas, setSubastaCreadas] = useState(false);
  const [subastaGanadas, setSubastaGanadas] = useState(false);

  const toggleSusbastasCreadas = () => {
    setSubastaCreadas(true);
    setSubastaGanadas(false);
  }

  const toggleSubastasGanadas = () => {
    setSubastaCreadas(false);
    setSubastaGanadas(true);
  }

  const HistorialSubCreadas = [
    {
      id: 2,
      imagen: './src/assets/cafe2.jfif',
      producto: 'Café Borbon',
      cantidad: '1200 kg',
      nombre_subasta: 'Subasta 241',
      fecha: '2024-02-26',
    },
    {
      id: 3,
      imagen: './src/assets/cafe6.png',
      producto: 'Café Tambo',
      cantidad: '300 kg',
      nombre_subasta: 'Subasta 500',
      fecha: '2024-08-10',
    },
    {
      id: 4,
      imagen: '',
      producto: 'Café Borbon',
      cantidad: '800 kg',
      nombre_subasta: 'Subasta 301',
      fecha: '2024-05-18',
    },
    {
      id: 5,
      imagen: './src/assets/cafe5.png',
      producto: 'Café Caturro',
      cantidad: '100 kg',
      nombre_subasta: 'Subasta 210',
      fecha: '2024-04-20',
    },
    {
      id: 6,
      imagen: './src/assets/cafe5.png',
      producto: 'Café Caturro',
      cantidad: '100 kg',
      nombre_subasta: 'Subasta 421',
      fecha: '2024-04-20',
    },
  ]

  const HistorialSubGanadas = [
    {
      id: 1,
      imagen: './src/assets/cafe5.png',
      producto: 'Café Caturro',
      cantidad: '100 kg',
      nombre_subasta: 'Subasta 13',
      fecha: '2024-04-20',
    },
    {
      id: 2,
      imagen: './src/assets/cafe2.jfif',
      producto: 'Café Borbon',
      cantidad: '1200 kg',
      nombre_subasta: 'Subasta 27',
      fecha: '2024-02-26',
    },
    {
      id: 3,
      imagen: './src/assets/cafe6.png',
      producto: 'Café Tambo',
      cantidad: '300 kg',
      nombre_subasta: 'Subasta 50',
      fecha: '2024-08-10',
    },
    {
      id: 4,
      imagen: '',
      producto: 'Café Borbon',
      cantidad: '800 kg',
      nombre_subasta: 'Subasta 248',
      fecha: '2024-05-18',
    },
  ]

  return (
    <div className='w-full'>
      <div className='content-img'></div>
      <img src={('./src/assets/profile_user.jfif')} className='img-user' alt='img-user' />
      <div className='content p-20'>
        <h1 className=' text-3xl mb-8'>Pablo Emilio</h1>
        <p className='text-xl mb-4'>Finca - Pitalito/Huila</p>
        <p className='text-xl mb-2'>Tel: 315784593</p>
        <p className='text-xl mb-2'>15-06-2005</p>
        <div className='h-12 w-full border-b border-black flex row'>
          <div className={`${subastaCreadas ? 'text-gray-500' : 'text-black'} w-1/2 flex justify-center items-center cursor-pointer mr-6`} onClick={toggleSusbastasCreadas}>Subastas Creadas</div>
          <div className={`${subastaGanadas ? 'text-black' : 'text-gray-500'} w-1/2 flex justify-center items-center cursor-pointer`} onClick={toggleSubastasGanadas}>Subastas Ganadas</div>
        </div>
        <div className='w-full'>
          <div className={`grid-cols-3 gap-8 p-10 w-full grid grid-cols-3 gap-8 p-10`}>
            {HistorialSubCreadas.map((historial) => (
              <Link key={historial.id} className='flex flex-col items-center justify-center border border-black rounded-lg p-4'>
                <div className='w-30 flex items-center justify-center'>
                  <img src={historial.imagen} alt="" className='w-full' />
                </div>
                <div className='w-70'>
                  <h1 className='text-xl font-semibold mb-4'>{historial.nombre_subasta}</h1>
                  <p className='text-lg mb-2'>{historial.producto}</p>
                  <p className='text-lg mb-2'>{historial.cantidad}</p>
                  <p className='text-sm text-right'>{historial.fecha}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className={`grid-cols-3 gap-8 p-10 w-full grid grid-cols-3 gap-8 p-10`}>
            {HistorialSubGanadas.map((historial) => (
              <Link key={historial.id} className='divs-subastas-ganadas flex flex-col items-center justify-center border border-black rounded-lg p-4'>
                <div className='w-30 flex items-center justify-center'>
                  <img src={historial.imagen} alt="" className='w-full' />
                </div>
                <div className='w-70'>
                  <h1 className='text-xl font-semibold mb-4'>{historial.nombre_subasta}</h1>
                  <p className='text-lg mb-2'>{historial.producto}</p>
                  <p className='text-lg mb-2'>{historial.cantidad}</p>
                  <p className='text-sm text-right'>{historial.fecha}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Historial