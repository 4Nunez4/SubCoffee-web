import TargetasCafetero from "../organismos/targetasCaf";
import CardOrganism from "../organismos/TargetaPujaOrganismo";
import ContactCardOrganism from "../organismos/TargetaContactoCafOrganismo";
import ButtonOfertaOrganism from "../organismos/BotonesOfertaOrganismos";


const SubastaOfertador = ({ children }) => {
  return (
    <div class="bg-white text-white w-full grid grid-cols-5 gap-2 h-full p-8">
      <div className=" col-span-4">
      <TargetasCafetero/>
      </div>
  <div className=" col-span-1">
    <ContactCardOrganism/>
  </div>
 
      <div className=" col-span-4">
      <CardOrganism/>
      </div>

      
     <div className=" col-span-1 ">
      <ButtonOfertaOrganism/>
     </div>
      

      {children}
    </div>
  );
};

export default SubastaOfertador;
