import TargetasCafetero from "../organismos/targetasCaf";
import CardContainer from "../organismos/TargetaGanadorOrganismo";
import Card from "../moleculas/TargetaGanadoresMolecula";
// import CardOrganism from "../organismos/TargetaPujaOrganismo";
import ContactCardOrganism from "../organismos/TargetaContactoCafOrganismo";
import ButtonGridOrganism from "../organismos/BotonesSubastaOrganismos";


const SubastaCafetero = ({ children }) => {
  return (
    <div class="bg-gray-900 text-white h-full w-full">
      <TargetasCafetero></TargetasCafetero>

      <div className="px-4 py-4 w-3/5 h-3/5 bg-blue-900 rounded-lg shadow-md overflow-hidden ">
        <CardContainer>
          <Card numero="1" nombre="juan camilo realpe" puja="$3.000.000" />
          <Card numero="2" nombre="juan camilo realpe" puja="$3.000.000" />
          <Card numero="3" nombre="juan camilo realpe" puja="$3.000.000" />
        </CardContainer>
      </div>

      
      <ContactCardOrganism></ContactCardOrganism>
      <ButtonGridOrganism></ButtonGridOrganism>

      {children}
    </div>
  );
};

export default SubastaCafetero;
