
import { TargetaInfVendedor,TargetaInfSubasta,TargetaInfPosicionesCompradores,TargetaBotonesCafetero} from "../components/organisms/Subasta/vendedor/index.js"

const SubastaVendedor = ({ children }) => {
  return (
    <div class="bg-white text-black w-full grid grid-cols-5 gap-2 h-full p-8">
      <div className="col-span-4">
        <TargetaInfSubasta />
      </div>
      <div className=" col-span-1">
        <TargetaInfVendedor />
      </div>

      <div className=" overflow-hidden col-span-4">
        <TargetaInfPosicionesCompradores />
      </div>

      <div className=" col-span-1 ">
        <TargetaBotonesCafetero />
      </div>

      {children}
    </div>
  );
};

export default SubastaVendedor;
