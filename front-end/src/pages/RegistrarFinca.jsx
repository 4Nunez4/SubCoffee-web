import React from 'react'

function RegistrarFinca() {
  return (
    <form className="p-4">
      <h1 className="text-center text-4xl font-bold mb-4">Registrar Finca</h1>
      <div className="mb-4 flex items-center">
        <label htmlFor="nombre" className="block text-lg mb-2 text-left">
          Nombre
        </label>
        <input type="text" required className="p-2 border border-gray-500 rounded-md w-full" />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="ubicacion" className="block text-lg mb-2 text-left">
          Ubicacion
        </label>
        <input type="text" required className="p-2 border border-gray-500 rounded-md w-full" />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="imagen" className="block text-lg mb-2 text-left">
          Imagen
        </label>
        <input type="file" required className="p-2 border border-gray-500 rounded-md w-full" />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="departamento" className="block text-lg mb-2 text-left">
          Departamento
        </label>
        <input type="text" required className="p-2 border border-gray-500 rounded-md w-full" />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="municipio" className="block text-lg mb-2 text-left">
          Municipio
        </label>
        <input type="text" required className="p-2 border border-gray-500 rounded-md w-full" />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="id_usuario" className="block text-lg mb-2 text-left">
          Id_usuario
        </label>
        <input type="text" required className="p-2 border border-gray-500 rounded-md w-full" />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="estado_finca" className="block text-lg mb-2 text-left">
          Estado de la fica
        </label>
        <input type="text" required className="p-2 border border-gray-500 rounded-md w-full" />
      </div>
      <div className="mb-4 flex">
        <label htmlFor="descripcion" className="block text-lg mb-2 text-left">
          Descripción
        </label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="p-2 border border-gray-500 rounded-md w-full"
        ></textarea>
      </div>
      <div className='flex justify-center'>
        <input type="submit" value="Cancelar Registro" className='w-400 h-75 rounder-lg text-white bg-black mr-20 cursor-pointer' />
        <input type="submit" value="Registrar Finca" className='w-400 h-75 rounder-lg text-white bg-red-700 mr-20 cursor-pointer' />
      </div>
    </form>
  )
}

export default RegistrarFinca