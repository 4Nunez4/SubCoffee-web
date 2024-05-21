import React, { useContext, useState } from 'react';
import NotificacionContext from '../../../context/NotificacionesContext';

const ActualizarNotificacion = ({ notificacion }) => {
  const { updateNots } = useContext(NotificacionContext);
  const [notificacionActualizada, setNotificacionActualizada] = useState({
    tipo_not: notificacion.tipo_not,
    texto_not: notificacion.texto_not,
  });

  const handleChange = (e) => {
    setNotificacionActualizada({ ...notificacionActualizada, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNots(notificacion.pk_id_not, notificacionActualizada);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Actualizar Notificación</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="tipo_not" className="block font-bold mb-2">
            Tipo de Notificación
          </label>
          <input
            type="text"
            id="tipo_not"
            name="tipo_not"
            value={notificacionActualizada.tipo_not}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        {/* Otros campos del formulario */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Actualizar Notificación
        </button>
      </form>
    </div>
  );
};

export default ActualizarNotificacion;