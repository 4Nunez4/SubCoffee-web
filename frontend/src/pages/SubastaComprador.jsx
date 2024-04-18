import { TargetaBotonesComprador, TargetaSliderPuja } from "../components/organisms/Subasta/comprador/index.js"
import { TargetaInfSubasta, TargetaInfVendedor} from "../components/organisms/Subasta/vendedor/index.js"

const SubastaComprador = ({ children }) => {
  return (
    <div class="bg-white text-white w-full grid grid-cols-5 gap-2 h-full p-8">
      <div className=" col-span-4">
      <TargetaInfSubasta/>
      </div>
  <div className=" col-span-1">
    <TargetaInfVendedor/>
  </div>
 
      <div className=" col-span-4">
      <TargetaSliderPuja/>
      </div>

      
     <div className=" col-span-1 ">
      <TargetaBotonesComprador/>
     </div>
      

      {children}
    </div>
  );
};

export default SubastaComprador;
