import TargetasCafetero from "../organismos/targetasCaf";
import CardContainer from "../organismos/TargetaGanadorOrganismo";
import Card from "../moleculas/TargetaGanadoresMolecula";
import ContactCardOrganism from "../organismos/TargetaContactoCafOrganismo";
import ButtonCafeteroOrganism from "../organismos/BotonesCafeteroOrganismos";


const SubastaCafetero = ({ children }) => {
  return (
    <div class="bg-white text-black w-full grid grid-cols-5 gap-2 h-full p-8">
      <div className="col-span-4">
      <TargetasCafetero/>
      </div>
  <div className=" col-span-1">
    <ContactCardOrganism/>
  </div>
 
      <div className=" overflow-hidden col-span-4">
        <CardContainer/>
       
        
      </div>

      
     <div className=" col-span-1 ">
      <ButtonCafeteroOrganism/>
     </div>
      

      {children}
    </div>
  );
};

export default SubastaCafetero;
