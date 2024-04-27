import React from "react";
import { Link } from "react-router-dom";

function SubastaCard() {
  const Subastas = [
    {
      title: "Subasta Esmeralda",
      description:
        "Esta variedad de café, cultivada en las montañas de Huila, ofrece notas de cacao y frutas maduras.",
      link: "/subasta/esmeralda",
      img: "./src/assets/nueuser_1.jfif",
      status: "Activa",
      fechaInicio: "2024-02-27-03-05",
      fechafin: "2024-02-27-03-05",
      tipo: "Borbon",
      precioInicial: "130.000",
      cantidad: "560",
      finca: "Hacienda Sosora",
      puntuacion: "89",
    },
    {
      title: "Geisha Dorada",
      description:
        "La variedad Geisha, con sus flores doradas, produce granos excepcionales con sabores florales y afrutados.",
      link: "/subasta/andino",
      img: "./src/assets/nueuser_2.jfif",
      status: "Espera",
      fechaInicio: "2024-02-27-03-05",
      fechafin: "2024-02-27-03-05",
      tipo: "Borbon",
      precioInicial: "10.000",
      cantidad: "200",
      finca: "Hacienda Rosales",
      puntuacion: "93",
    },
    {
      title: "Geisha Dorada",
      description:
        "La variedad Geisha, con sus flores doradas, produce granos excepcionales con sabores florales y afrutados.",
      link: "/subasta/geisha",
      img: "./src/assets/nueuser_3.jfif",
      status: "Espera",
      fechaInicio: "2024-02-27-03-05",
      fechafin: "2024-02-27-03-05",
      tipo: "Borbon",
      precioInicial: "90.000",
      cantidad: "1000",
      finca: "Hacienda Napoles",
      puntuacion: "91",
    },
    {
      title: "Geisha Dorada",
      description:
        "La variedad Geisha, con sus flores doradas, produce granos excepcionales con sabores florales y afrutados.",
      link: "/subasta/geisha",
      img: "./src/assets/nueuser_3.jfif",
      status: "Espera",
      fechaInicio: "2024-02-27-03-05",
      fechafin: "2024-02-27-03-05",
      tipo: "Borbon",
      precioInicial: "90.000",
      cantidad: "1000",
      finca: "Hacienda Napoles",
      puntuacion: "91",
      id: 4,
    },
    {
      title: "Geisha Dorada",
      description:
        "La variedad Geisha, con sus flores doradas, produce granos excepcionales con sabores florales y afrutados.",
      link: "/subasta/andino",
      img: "./src/assets/nueuser_2.jfif",
      status: "Espera",
      fechaInicio: "2024-02-27-03-05",
      fechafin: "2024-02-27-03-05",
      tipo: "Borbon",
      precioInicial: "10.000",
      cantidad: "200",
      finca: "Hacienda Rosales",
      puntuacion: "93",
    },
    {
      title: "Geisha Dorada",
      description:
        "La variedad Geisha, con sus flores doradas, produce granos excepcionales con sabores florales y afrutados.",
      link: "/subasta/geisha",
      img: "./src/assets/nueuser_3.jfif",
      status: "Espera",
      fechaInicio: "2024-02-27-03-05",
      fechafin: "2024-02-27-03-05",
      tipo: "Borbon",
      precioInicial: "90.000",
      cantidad: "1000",
      finca: "Hacienda Napoles",
      puntuacion: "91",
    },
    {
      title: "Geisha Dorada",
      description:
        "La variedad Geisha, con sus flores doradas, produce granos excepcionales con sabores florales y afrutados.",
      link: "/subasta/geisha",
      img: "./src/assets/nueuser_3.jfif",
      status: "Espera",
      fechaInicio: "2024-02-27-03-05",
      fechafin: "2024-02-27-03-05",
      tipo: "Borbon",
      precioInicial: "90.000",
      cantidad: "1000",
      finca: "Hacienda Napoles",
      puntuacion: "91",
    },
  ];

  return (
    <div
      className="grid grid-cols-3 justify-center overflow-x-auto w-full gap-x-4"
      style={{  scrollbarWidth: "none" }}
    >
      {Subastas.map((subasta, i) => (
        <Link
          key={i}
          className="bg-gray-100 p-2 rounded-lg shadow-md mb-4 border hover:bg-zinc-200 transition-all ease-in-out duration-400"
        >
          <h2 className="text-xl font-semibold py-2 text-center">
            {subasta.title}
          </h2>
          <div className="flex items-center gap-x-2 my-1">
            <img src={subasta.img} alt="" className="flex w-24 h-24" />
            <p className="text-gray-700 text-sm mb-4">{subasta.description}</p>
          </div>
          <div className="text-xs text-gray-500">
            <p>Estado: {subasta.status}</p>
            <p>
              Desde: {subasta.fechaInicio} hasta {subasta.fechafin}
            </p>
            <p>Tipo: {subasta.tipo}</p>
            <p>Precio inicial: {subasta.precioInicial}</p>
            <p>Cantidad: {subasta.cantidad} Kg</p>
            <p>Finca: {subasta.finca}</p>
            <p>Puntuación: {subasta.puntuacion}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SubastaCard;
