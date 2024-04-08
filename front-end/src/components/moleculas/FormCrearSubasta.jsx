import React from "react";

function FormCrearSubasta(){

    return(

        <div className="flex flex-col">

            <form>

                <div className='flex flex-col'> 

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="number" 
                        values = "variedad" 
                        placeholder= "Tipo de variedad" 
                        required/>
                    </div>   

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer"
                        type="number" 
                        values = "factor" 
                        placeholder= "Puntuacion/Factor" 
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="text" 
                        values = "cantidad" 
                        placeholder="Cantidad de cafe" 
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="number" 
                        values = "monto" 
                        placeholder="Monto inicial" 
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="date" 
                        values="FechaFin" 
                        placeholder="Fecha Fin" 
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer"
                        type="text" 
                        values = "NombreCertificado" 
                        placeholder="Nombre de certificado" 
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="text" 
                        values = "DocumentoCertificado" 
                        placeholder = "Suba el documentó que certifica la calidad de su café"
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="text" 
                        values = "imagen" 
                        placeholder="Suba una imagen del café con orientación horizontal"
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <input  className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer " 
                        type="text" 
                        values = "discripcion" 
                        placeholder="Descripcion de la subasta" 
                        required/>

                        <button>Hola Crea tu subasta </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormCrearSubasta