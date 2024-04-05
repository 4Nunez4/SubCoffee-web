import Nombre from "../atomos/TargetaTresGanadores/NombreGanador";
import Puja from "../atomos/TargetaTresGanadores/PujaGanador";
import Numero from "../atomos/TargetaTresGanadores/NumeroGanador";

const Card = ({ nombre, puja, numero }) => (
  <div className="px-1 py-1 grid grid-cols-3 text-white text-xl hover:bg-sky-950 cursor-pointer rounded-lg  ">
    <Numero numero={numero} />
    <Nombre nombre={nombre} />
    <Puja puja={puja} />
  </div>
);

export default Card;
