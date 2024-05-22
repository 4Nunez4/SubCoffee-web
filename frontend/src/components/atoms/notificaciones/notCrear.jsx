import React, { useContext, useState } from 'react';
import NotificacionContext from '../../../context/NotificacionesContext';

const CrearNotificacion = () => {
  const { createNots } = useContext(NotificacionContext);
  const [notificacion, setNotificacion] = useState({
    tipo_not: '',
    texto_not: '',
    fk_id_subasta: '',
    fk_id_usuario: '',
  });

  const handleChange = (e) => {
    setNotificacion({ ...notificacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNots(notificacion);
    // Restablecer el formulario después de crear la notificación
    setNotificacion({
      tipo_not: '',
      texto_not: '',
      fk_id_subasta: '',
      fk_id_usuario: '',
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Crear Notificación</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="tipo_not" className="block font-bold mb-2">
            Tipo de Notificación
          </label>
          <input
            type="text"
            id="tipo_not"
            name="tipo_not"
            value={notificacion.tipo_not}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="texto_not" className="block font-bold mb-2">
            Texto de la Notificación
          </label>
          <textarea
            id="texto_not"
            name="texto_not"
            value={notificacion.texto_not}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="fk_id_subasta" className="block font-bold mb-2">
            ID de la Subasta
          </label>
          <input
            type="text"
            id="fk_id_subasta"
            name="fk_id_subasta"
            value={notificacion.fk_id_subasta}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fk_id_usuario" className="block font-bold mb-2">
            ID del Usuario
          </label>
          <input
            type="text"
            id="fk_id_usuario"
            name="fk_id_usuario"
            value={notificacion.fk_id_usuario}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Crear Notificación
        </button>
      </form>
    </div>
  );
};

export default CrearNotificacion;