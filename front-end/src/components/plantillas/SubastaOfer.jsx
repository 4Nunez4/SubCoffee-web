import TargetasCafetero from "../organismos/targetasCaf";
import CardOrganism from "../organismos/TargetaPujaOrganismo";
import ContactCardOrganism from "../organismos/TargetaContactoCafOrganismo";
import ButtonGridOrganism from "../organismos/BotonesSubastaOrganismos";


const SubastaOfertador = ({ children }) => {
  return (
    <div class="bg-white text-black w-full grid grid-cols-5 gap-2 h-full p-8">
      <div className=" col-span-4">
      <TargetasCafetero/>
      </div>
  <div className=" col-span-1">
    <ContactCardOrganism/>
  </div>
 
      <div className=" bg-blue-900 rounded-lg shadow-md overflow-hidden col-span-4">
      <CardOrganism/>
      </div>

      
     <div className=" col-span-1 ">
      <ButtonGridOrganism/>
     </div>
      

      {children}
    </div>
  );
};

export default SubastaOfertador;
