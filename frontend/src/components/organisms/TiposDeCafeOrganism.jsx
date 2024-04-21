import CafeCardAtom from "../atoms/CafeCardAtom";

const TiposDeCafeOrganism = () => {
  const datos = [
    {
      title: "Tipo seco",
      img: "cafeseco.jpeg",
    },
    {
      title: "Tipo mojado",
      img: "imagen_mojado.jpg",
    },
    {
      title: "Tipo Molido",
      img: "imagen_molido.jpg",
    },
    {
      title: "Tipo Molido Grueso",
      img: "imagen_molido_grueso.jpg",
    },
    {
      title: "Tipo Molido Delgado",
      img: "imagen_molido_delgado.jpg",
    },
    {
      title: "Tipo Tostado",
      img: "imagen_tostado.jpg",
    },
    {
      title: "Tipo Tostado Suave",
      img: "imagen_tostado_suave.jpg",
    },
    {
      title: "Tipo Tostado Medio",
      img: "imagen_tostado_medio.jpg",
    },
    {
      title: "Tipo Tostado Oscuro",
      img: "imagen_tostado_oscuro.jpg",
    },
  ];

  return (
    <div
      className="flex justify-center w-full space-x-6 p-6 overflow-x-auto "
      style={{ scrollbarWidth: "none" }}
    >
      {datos.map((dato, i) => (
        <CafeCardAtom key={i} title={dato.title} img={dato.img} />
      ))}
    </div>
  );
};

export default TiposDeCafeOrganism;
