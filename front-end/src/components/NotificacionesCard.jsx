import React from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaBarsProgress } from "react-icons/fa6";

function NotificacionesCard({ notificacion }) {
  const Notificaciones = [
    {
      id: 1,
      foto_user_not: "./src/assets/profile_user.jfif",
      nombre_user_not: "Juan Camilo Realpe",
      tipo_not: "Cierre de subasta",
      subasta_not: "El mejor Borbon",
      texto_not: "La subasta va a cerrar en 5 minutos, corre a  ",
      fecha_not: "24-02-2024 3:00 p.m. ",
    },
    {
      id: 2,
      foto_user_not: "./src/assets/profile_user3.jfif",
      nombre_user_not: "Rosita Uribe",
      tipo_not: "Nuevo mensaje",
      subasta_not: "Subasta pepa negra",
      texto_not: "Has recibido un mensaje de Carlos",
      fecha_not: "26-02-2024 5:00 p.m. ",
    },
    {
      id: 3,
      foto_user_not: "./src/assets/profile_user2.jfif",
      nombre_user_not: "Pablo Emilio Escobar",
      tipo_not: "Nueva oferta",
      subasta_not: "Subasta Laboyanos",
      texto_not: "Camilo acaba de realizar una mejor oferta",
      fecha_not: "31-01-2024 12:00 p.m. ",
    },
    {
      id: 4,
      foto_user_not: "./src/assets/profile_user4.jfif",
      nombre_user_not: "Maria Duque",
      tipo_not: "Nuevo mensaje",
      subasta_not: "Subasta Bola ocho",
      texto_not: "Has recibido un mensaje de Chomin",
      fecha_not: "29-02-2024 2:00 p.m. ",
    },
  ];

  return (
    <div className="my-4 mx-16 py-3 px-6 rounded-lg border border-black overflow-y-auto" style={{ maxHeight: '80vh' }}>
      <nav className="flex justify-between items-center mb-4">
        <span className="font-bold text-2xl ml-3">Notificaciones</span>
        <div className="m-4 relative w-2/4">
          <input type="text" placeholder="Buscar notificación" className="p-2 pl-10 pr-10 rounded border border-gray-400 w-full" />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
          <FaBarsProgress className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex gap-x-5">
          <button className="bg-green-500 text-white px-4 border hover:border-green-500 py-2 rounded hover:bg-white hover:text-green-500">Todo</button>
          <button className="bg-green-500 text-white px-4 border hover:border-green-500 py-2 rounded hover:bg-white hover:text-green-500">No leídos</button>
        </div>
      </nav>
      {Notificaciones.map((notificacion) => (
        <Link key={notificacion.id} className="flex border rounded-lg p-2 my-4 border-gray-500 shadow-md hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center mx-4">
            <img src={notificacion.foto_user_not} alt="Foto de usuario" className="rounded-full w-20 h-20" />
          </div>
          <div>
            <h4 className="text-2xl font-semibold">{notificacion.nombre_user_not}</h4>
            <p className="text-sm">{notificacion.tipo_not}: {notificacion.subasta_not}</p>
            <p className="text-sm">{notificacion.texto_not}</p>
            <small className="text-xs">{notificacion.fecha_not}</small>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default NotificacionesCard;
