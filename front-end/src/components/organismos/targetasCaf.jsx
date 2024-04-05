import TargetaInfoFinca from "../moleculas/TargetaFinca";
const TargetasCafetero= ({children})=>{
    return ( 
        <div className="h-full w-full">
            <TargetaInfoFinca/>
            
                        {children}
        </div>
     );
}

export default TargetasCafetero;