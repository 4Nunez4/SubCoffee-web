import Targeta from "../atomos/TargetaInformacionFinca/targeta";
import Avatar from "../atomos/Avatar";
import Texto from "../atomos/TargetaInformacionFinca/texto";
import TextoNegrita from "../atomos/TargetaInformacionFinca/textNegrita";
import CenTextCard from "../atomos/TargetaInformacionFinca/CenTextCard";
const TargetaInfoFinca= ({children})=> {
    return ( 
            <div>
        <Targeta>
             <Avatar src="/src/assets/cafe4.jfif"></Avatar>   

            <CenTextCard>
                <TextoNegrita>Variedad
                <Texto>Caturra</Texto>
                </TextoNegrita>  
                <TextoNegrita>Puntuación
                <Texto>81</Texto>
                </TextoNegrita>  
                 
            </CenTextCard>

            <CenTextCard>
            <TextoNegrita>Monto inicial
                <Texto>$1.000.000</Texto>
                </TextoNegrita>  
                <TextoNegrita>Cantidad
                <Texto>$1.000.000</Texto>
                </TextoNegrita>   
            </CenTextCard>

            <CenTextCard>
            <TextoNegrita>Fecha
                <Texto>2024-04-04</Texto>
                </TextoNegrita>  
                <TextoNegrita>Ver certificado
                <Texto >1</Texto>
                </TextoNegrita>  
            </CenTextCard>
            
            
            
        </Targeta> 
        
        {children}  
            </div>
     );
}

export default TargetaInfoFinca;