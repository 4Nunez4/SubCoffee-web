import React from 'react';
import CafeCardAtom from "../atoms/CafeCardAtom";

const TiposDeCafeOrganism = () => {
  const datos = [
    { title: "Tipo seco", img: "cafeseco.jpeg", description: "Café seco, con un sabor intenso y robusto." },
    { title: "Tipo mojado", img: "cafe_mojado.png", description: "Café procesado por vía húmeda, con un sabor suave y equilibrado." },
    { title: "Tipo Molido", img: "cafe_molido.png", description: "Café molido listo para preparar." },
    { title: "Tipo Molido Grueso", img: "cafe_molido_grueso.png", description: "Café molido grueso, ideal para métodos de preparación como la prensa francesa." },
    { title: "Tipo Molido Delgado", img: "cafe_molido_delgado.png", description: "Café molido delgado, perfecto para métodos de preparación como la cafetera de goteo." },
    { title: "Tipo Molido Delgado", img: "cafe_molido_delgado.png", description: "Café molido delgado, perfecto para métodos de preparación como la cafetera de goteo." },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-6">
    {datos.map((dato, i) => (
      <CafeCardAtom
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

export default TiposDeCafeOrganism;
