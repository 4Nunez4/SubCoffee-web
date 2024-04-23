import React, { useState } from 'react'
import axios from 'axios'

function RegistrarFinca() {
  const [formFinca, setFormFinca] = useState({
    nombre_fin: '',
    ubicacion_fin: '',
    imagen_fin: '',
    descripcion_fin: '',
    municipio_fin: '',
    departamento_fin: '',
    fk_id_usuario: '',
  })

  const handleChange = (e) => {
    setFormFinca({ ...formFinca, [e.target.name]: e.target.value});
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post('http://localhost:4000/finca/registrar',formFinca);

      if(register.ok) {
        console.log('Se registró la finca exitosamente.');
      } else {
        console.log('No se registró la finca.');
      }
    } catch (e) {
      console.error('Error: '+e);
    }
  }

  const handleCancel = () => {
    // Add cancel logic here
  }

  return (
    <form className="p-4" onSubmit={handleRegister}>
      <h1 className="text-center text-4xl font-bold mb-4">Registrar Finca</h1>
      <div className="mb-4 flex items-center">
        <label htmlFor="nombre" className="block text-lg mb-2 text-left">Nombre</label>
        <input type="text" name='nombre_fin' required className="p-2 border border-gray-500 rounded-md w-full" onChange={handleChange} />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="ubicacion" className="block text-lg mb-2 text-left">Ubicacion</label>
        <input type="text" name='ubicacion_fin' required className="p-2 border border-gray-500 rounded-md w-full" onChange={handleChange} />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="imagen" className="block text-lg mb-2 text-left">Imagen</label>
        <input type="file" name='imagen_fin' required className="p-2 border border-gray-500 rounded-md w-full" onChange={handleChange} />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="municipio" className="block text-lg mb-2 text-left">Municipio</label>
        <input type="text" name='municipio_fin' required className="p-2 border border-gray-500 rounded-md w-full" onChange={handleChange} />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="departamento" className="block text-lg mb-2 text-left">Departamento</label>
        <input type="text" name='departamento_fin' required className="p-2 border border-gray-500 rounded-md w-full" onChange={handleChange} />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="id_usuario" className="block text-lg mb-2 text-left">Id_usuario</label>
        <input type="text" name='fk_id_usuario' required className="p-2 border border-gray-500 rounded-md w-full" onChange={handleChange} />
      </div>
      {/* <div className="mb-4 flex items-center">
        <label htmlFor="estado_finca" className="block text-lg mb-2 text-left">Estado de la fica</label>
        <input type="text" name='' required className="p-2 border border-gray-500 rounded-md w-full" onChange={handleChange} />
      </div> */}
      <div className="mb-4 flex">
        <label htmlFor="descripcion" className="block text-lg mb-2 text-left">Descripción</label>
        <textarea name="descripcion_fin" id="" cols="30" rows="10" className="p-2 border border-gray-500 rounded-md w-full"></textarea>
      </div>
      <div className='flex justify-center flex-row'>
        <input type="submit" value="Cancelar Registro" className='w-40 h-10 text-white bg-black mr-20 cursor-pointer' />
        <input type="submit" value="Registrar Finca" className='w-40 h-10 text-white bg-red-700 ml-20 cursor-pointer' />
      </div>
    </form>
  )
}

export default RegistrarFinca