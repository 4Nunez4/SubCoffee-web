import CafeCardAtom from "../atoms/CafeCardAtom";

const TiposDeCafeOrganism = () => {
  const datos = [
    { title: "Tipo seco", img: "cafeseco.jpeg", },
    { title: "Tipo mojado", img: "cafe_mojado.png", },
    { title: "Tipo Molido", img: "cafe_molido.png", },
    { title: "Tipo Molido Grueso", img: "cafe_molido_grueso.png", },
    { title: "Tipo Molido Delgado", img: "cafe_molido_delgado.png", },
    { title: "Tipo Tostado", img: "cafe_tostado.png", },
    { title: "Tipo Tostado Suave", img: "cafe_tostado_suave.png", },
    { title: "Tipo Tostado Medio", img: "cafe_tostado_medio.png", },
    { title: "Tipo Tostado Oscuro", img: "cafe_tostado_oscuro.png", },
  ];

  return (
    <div
      className="flex justify-center items-center space-x-6 py-6 px-6 overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {datos.map((dato, i) => (
        <CafeCardAtom key={i} title={dato.title} img={dato.img} />
      ))}
    </div>
  );
};

export default TiposDeCafeOrganism;
