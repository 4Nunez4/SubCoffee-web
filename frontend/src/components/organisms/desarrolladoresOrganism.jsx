import React from "react";
import DesarrolladorAtom from "../atoms/desarrollador";
import { button } from "@nextui-org/theme";

const DesarrolladoresOrganism = () => {
  const datos = [
    {
      title: "",
      img: "cafeseco.jpeg",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Tipo mojado",
      img: "cafe_mojado.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Tipo Molido",
      img: "cafe_molido.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Tipo Molido Grueso",
      img: "cafe_molido_grueso.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Tipo Molido Delgado",
      img: "cafe_molido_delgado.png",
      description: (
        <button className="bg-[#e0e0e0] text-[#009100] px-4 py-2 rounded-md hover:bg-[#009100] hover:text-white">
          contactame
        </button>
      ),
    },
    {
      title: "Tipo Molido Delgado",
      img: "cafe_molido_delgado.png",
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
