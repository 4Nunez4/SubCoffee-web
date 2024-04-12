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
 
      <div className=" bg-blue-900 rounded-lg shadow-md overflow-hidden col-span-4">
        <CardContainer>
          <Card numero="1" nombre="juan camilo realpe" puja="$3.000.000" />
          <Card numero="2" nombre="mancani " puja="$2.000.000" />
          <Card numero="3" nombre="pistacho" puja="$1.000.000" />
        </CardContainer>
      </div>

      
     <div className=" col-span-1 ">
      <ButtonCafeteroOrganism/>
     </div>
      

      {children}
    </div>
  );
};

export default SubastaCafetero;
