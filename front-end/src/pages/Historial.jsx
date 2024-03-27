import React, { useState } from 'react'
import '../css/Historial.css'
import { Link } from 'react-router-dom'

const Historial = (historial) => {
  const [subastaCreadas, setSubastaCreadas] = useState(true);
  const [subastaGanadas, setSubastaGanadas] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubasta, setSelectedSubasta] = useState(null);

  const toggleSusbastasCreadas = () => {
    setSubastaCreadas(true);
    setSubastaGanadas(false);
  }

  const toggleSubastasGanadas = () => {
    setSubastaCreadas(false);
    setSubastaGanadas(true);
  }

  const openModal = (subasta) => {
    setSelectedSubasta(subasta);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const HistorialSubCreadas = [
    {
      id: 2,
      imagen: './src/assets/cafe2.jfif',
      nombre_usuario: 'Lucas Torres',
      producto: 'Borbon Rosado',
      cantidad: '1200 kg',
      precio_inicial: 1300000,
      nombre_subasta: 'Subasta 241',
      fecha: '2024-02-26',
    },
    {
      id: 3,
      imagen: './src/assets/cafe6.png',
      nombre_usuario: 'Maria Vanegas',
      producto: 'Tambo',
      cantidad: '300 kg',
      precio_inicial: 300000,
      nombre_subasta: 'Subasta 500',
      fecha: '2024-08-10',
    },
    {
      id: 4,
      imagen: './src/assets/cafe3.jfif',
      nombre_usuario: 'Rosita Uribe',
      producto: 'Borbon',
      cantidad: '800 kg',
      precio_inicial: 840000,
      nombre_subasta: 'Subasta 301',
      fecha: '2024-05-18',
    },
    {
      id: 5,
      imagen: './src/assets/cafe4.jfif',
      nombre_usuario: 'Maria Duque',
      producto: 'Caturro',
      cantidad: '100 kg',
      precio_inicial: 100000,
      nombre_subasta: 'Subasta 210',
      fecha: '2024-04-20',
    },
    {
      id: 6,
      imagen: './src/assets/cafe5.png',
      nombre_usuario: 'Andres Chicaiza',
      producto: 'Caturro',
      cantidad: '1000 kg',
      precio_inicial: 1000000,
      nombre_subasta: 'Subasta 421',
      fecha: '2024-04-20',
    },
  ]

  const HistorialSubGanadas = [
    {
      id: 1,
      imagen: './src/assets/cafe5.png',
      nombre_usuario: 'Pepito Perez',
      producto: 'Caturro',
      cantidad: '100 kg',
      precio_inicial: 200000,
      precio_final: 40000,
      nombre_subasta: 'Subasta 13',
      fecha: '2024-04-20',
    },
    {
      id: 2,
      imagen: './src/assets/cafe2.jfif',
      nombre_usuario: 'Juan Camilo Realpe',
      producto: 'Borbon',
      cantidad: '1200 kg',
      precio_inicial: 1100000,
      precio_final: 1600000,
      nombre_subasta: 'Subasta 27',
      fecha: '2024-02-26',
    },
    {
      id: 3,
      imagen: './src/assets/cafe6.png',
      nombre_usuario: 'Jorge Molina',
      producto: 'Tambo',
      cantidad: '300 kg',
      precio_inicial: 260000,
      precio_final: 600000,
      nombre_subasta: 'Subasta 50',
      fecha: '2024-08-10',
    },
    {
      id: 4,
      imagen: './src/assets/cafe3.jfif',
      nombre_usuario: 'Juanito Perez',
      producto: 'Borbon',
      cantidad: '800 kg',
      precio_inicial: 640000,
      precio_final: 1300000,
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
          <div className={`${subastaCreadas ? 'text-black font-semibold' : 'text-gray-500'} w-1/2 flex justify-center items-center cursor-pointer mr-6`} onClick={toggleSusbastasCreadas}>Subastas Creadas</div>
          <div className={`${subastaGanadas ? 'text-black font-semibold' : 'text-gray-500 text-500'} w-1/2 flex justify-center items-center cursor-pointer`} onClick={toggleSubastasGanadas}>Subastas Ganadas</div>
        </div>
        <div className='w-full'>
          <div className={`${subastaCreadas ? 'grid' : 'hidden' } grid-cols-3 gap-8 p-10 w-full grid grid-cols-3 gap-8 p-10`}>
            {HistorialSubCreadas.map((historial) => (
              <div key={historial.id} className='flex flex-row items-center border border-black rounded-lg p-4' onClick={() => openModal(historial)}>
                <div className='w-30 flex items-center justify-center m-4'>
                  <img src={historial.imagen} alt="" className='w-full' />
                </div>
                <div className='w-80'>
                  <h1 className='text-xl font-semibold mb-4'>{historial.nombre_subasta}</h1>
                  <p className='text-lg mb-2'>{historial.producto}</p>
                  <p className='text-lg mb-2'>{historial.cantidad}</p>
                  <p className='text-sm text-right'>{historial.fecha}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`${subastaGanadas ? 'grid' : 'hidden' } grid-cols-3 gap-8 p-10 w-full grid grid-cols-3 gap-8 p-10`}>
            {HistorialSubGanadas.map((historial) => (
              <div key={historial.id} className='flex flex-row items-center border border-black rounded-lg p-4' onClick={() => openModal(historial)}>
                <div className='w-30 flex items-center justify-center m-4'>
                  <img src={historial.imagen} alt="" className='w-full' />
                </div>
                <div className='w-80'>
                  <h1 className='text-xl font-semibold mb-4'>{historial.nombre_subasta}</h1>
                  <p className='text-lg mb-2'>{historial.producto}</p>
                  <p className='text-lg mb-2'>{historial.cantidad}</p>
                  <p className='text-sm text-right'>{historial.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className='bg-white p-8 rounded-lg'>
            <div className="flex flex-row justify-center items-center" >
              <div className='w-30 flex items-center justify-center m-4'>
                <img src={selectedSubasta.imagen} alt="" className="w-full" />
              </div>
              <div className='w-80'>
                <h2 className="text-3xl font-semibold mb-14">{selectedSubasta.nombre_subasta}</h2>
                <p className="text-lg mb-2">Usuario: {selectedSubasta.nombre_usuario}</p>
                <p className="text-lg mb-2">Producto: {selectedSubasta.producto}</p>
                <p className="text-lg mb-2">Cantidad: {selectedSubasta.cantidad}</p>
                {selectedSubasta.precio_final && (
                  <p className="text-lg mb-2">Precio final: {selectedSubasta.precio_final}</p>
                )}
                {/* {subastaGanadas && (
                  <>
                    <p className="text-lg mb-2">Precio inicial: {selectedSubasta.precio_inicial}</p>
                    <p className="text-lg mb-2">Precio final: {selectedSubasta.precio_final}</p>
                  </>
                )}
                {subastaCreadas && (
                  <>
                    <p className="text-lg mb-2">Precio inicial: {selectedSubasta.precio_inicial}</p>
                  </>
                )} */}
                <p className="text-sm text-right mt-10">{selectedSubasta.fecha}</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Historial;