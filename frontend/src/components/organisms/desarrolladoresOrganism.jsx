import React from "react";
import DesarrolladorAtom from "../atoms/desarrollador";

const DesarrolladoresOrganism = () => {
  const datos = [
    {
      title: "Jorge Enrique Nuñez Molina",
      img: "jorge.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Juan Camilo Realpe Ceron",
      img: "juan.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Laura Katalina Muñoz Valderrama",
      img: "katalina.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Valentima Diaz Lerma",
      img: "valentina.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Jose Alejandro Velez",
      img: "jose.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "James Alfaro ",
      img: "james.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-6">
      {datos.map((dato, i) => (
        <DesarrolladorAtom
          key={i}
          title={dato.title}
          img={dato.img}
          description={dato.description}
          className="shadow-lg rounded-lg p-4 w-full transition-transform duration-300 hover:scale-110"
        />
      ))}
    </div>
  );
};

export default DesarrolladoresOrganism;
