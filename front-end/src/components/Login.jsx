import React, { useState } from 'react';
import axios from 'axios';
import cafeLo from '../assets/cofeLogin.png';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/validar', {
        email_user: email,
        password_user: password
      });
      alert(response.data.message); // Muestra mensaje de éxito
      setShowModal(true);
    } catch (error) {
      alert('Asegurese que los datos ingresados sean correctos.', error); // Muestra mensaje de error
      setShowModal(true); // Mostrar el modal
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowModal(false)}>&times;</span>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white dark:bg-white-600 shadow-md rounded-lg max-w-3xl mx-auto border border-gray-700 p-8">
        <div className="md:w-1/2 md:p-4">
          <form className="md:px-3" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-extrabold text-center mb-4 dark:text-black-200">INICIAR SESIÓN</h1>
            <div className="mb-4">
              <label htmlFor="correo" className="block text-sm font-medium text-black-700 dark:text-gray-800 mb-2">Correo</label>
              <input
                type="email"
                id="correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-600 focus:outline-none focus:border-indigo-500"
                placeholder="Ingrese su correo"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-black-700 dark:text-gray-800 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-600 focus:outline-none focus:border-indigo-600"
                placeholder="Ingrese su contraseña"
                required
              />
              <a href="#" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Sesión
            </button>
            <div className="text-center mt-4">
              <span className="text-xs text-gray-600">¿No tienes una cuenta?</span>
              <a href="#" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-1">Regístrate aquí</a>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={cafeLo}
            alt="Imagen"
            className="object-cover rounded-lg w-3/4 md:w-full h-full"
            style={{ maxWidth: '230px' }}
          />
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default Login;
