import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [rol, setRol] = useState('');
  const [estado, setEstado] = useState('');
  const [file, setFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', file);
    formData.append('pk_cedula_user', cedula);
    formData.append('nombre_user', nombre);
    formData.append('email_user', email);
    formData.append('password_user', password);
    formData.append('descripcion_user', descripcion);
    formData.append('telefono_user', telefono);
    formData.append('fecha_nacimiento_user', fechaNacimiento);
    formData.append('rol_user', rol);
    formData.append('estado_user', estado);
   
    try {
       const response = await axios.post('http://localhost:4000/usuario/registrar', formData, {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
       });
       alert(response.data.message);
    } catch (error) {
       console.error('Error al registrar usuario:', error);
       alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }
   };
   

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-extrabold text-center mb-4">Registro de Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Ingrese su correo"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div>
            <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Cédula</label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Ingrese su cédula"
              required
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Ingrese una descripción"
              required
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Ingrese su teléfono"
              required
            />
          </div>
          <div>
            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="vendedor">Vendedor</option>
              <option value="comprador">Comprador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen de Perfil</label>
            <input
              type="file"
              id="imagen"
              onChange={(e) => setFile(e.target.files[0])}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          {validationErrors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong>Error de validación:</strong>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
