import React from 'react';
import CafeCardAtom from "../atoms/CafeCardAtom";

const TiposDeCafeOrganism = () => {
  const datos = [
    { title: "Tipo seco", img: "cafeseco.jpeg", },
    { title: "Tipo mojado", img: "cafe_mojado.png", },
    { title: "Tipo Molido", img: "cafe_molido.png", },
    { title: "Tipo Molido Grueso", img: "cafe_molido_grueso.png", },
    { title: "Tipo Molido Delgado", img: "cafe_molido_delgado.png", },
  ];

  return (
    <div className="flex justify-center items-center gap-6 py-6 px-6 overflow-x-auto">
      {datos.map((dato, i) => (
        <CafeCardAtom key={i} title={dato.title} img={dato.img} className="shadow-md rounded-lg p-4" />
      ))}
    </div>
  );
};

export default TiposDeCafeOrganism;
