import TargetaInfoFinca from "../moleculas/TargetaFinca";
const TargetasCafetero= ({children})=>{
    return ( 
        <div >
            <TargetaInfoFinca/>
            
                        {children}
        </div>
     );
}

export default TargetasCafetero;