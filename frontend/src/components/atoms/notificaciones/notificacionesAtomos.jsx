import React from 'react';
import { Link } from 'react-router-dom';

const Notificacion = ({ notificacion }) => {
  const { pk_id_not, tipo_not, fecha_not, texto_not, fk_id_subasta, nombre_user } = notificacion;

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <p className="text-gray-700">
        {nombre_user}: {texto_not}
      </p>
      <p className="text-gray-500 text-sm">{fecha_not}</p>
      <Link
        to={`/subasta/${fk_id_subasta}`}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Ir a la subasta
      </Link>
    </div>
  );
};

export default Notificacion;