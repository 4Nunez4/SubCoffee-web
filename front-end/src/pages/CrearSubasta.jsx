import ImagenSuba from "../assets/ImagenSubasta.png"


function CrearSubasta(){

    return(
        <div className="flex flex-col">
        
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">

                <div className=' flex flex-col justify-center bg-slate-50 shadow-md rounded-lg px-8 py-6 border max-w-[90%] max-h-[90%] auto-cols-auto border-stone-950 overflow-auto'>

                            <div className="flex flex-col z-10 ">
                            <h1 className="flex flex-col justify-center items-center ml-96 text-xl font-semibold z-10">Crear Tu Subasta Ya</h1> 
                            </div>

                            <div className="flex flex-col z-10">
                            <p className="flex flex-col justify-center items-center ml-96 text-xl mb-4 z-10 font-semibold">¡Subasta Tu pasión y despierta el aroma del éxito!</p> 
                            </div>
                            <div className="flex z-10">
                            <div className="flex flex-col">
                                    <img
                                        src={ImagenSuba}
                                        alt="Imagen"
                                        className="flex w-[60%] h-full "
                                    />
                            </div>
                            
                            <form action="#">

                            <div className='flex flex-col w-96'> 
                            
                                <div className="flex flex-col">
                                <label>
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer " type="number" values = "variedad" placeholder= "Tipo de variedad" required/>
                                </label>
                                </div>   

                                <div className="flex flex-col">
                                <label>
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer"type="number" values = "factor" placeholder= "Puntuacion/Factor" required/>
                                </label> 
                                </div>

                                <div className="flex flex-col">
                                <label>
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" type="text" values = "cantidad" placeholder="Cantidad de cafe" required/>
                                </label> 
                                </div>

                                <div className="flex flex-col">
                                <label>
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" type="number" values = "monto" placeholder="Monto inicial" required/>
                                </label> 
                                </div>

                                <div className="flex flex-col">
                                <label>
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" type="date" values="FechaFin" placeholder="Fecha Fin" required/>
                                </label> 
                                </div>
                                
                                <div className="flex flex-col">
                                <label>
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" type="text" values = "NombreCertificado" placeholder="Nombre de certificado" required/>
                                </label> 
                                </div>

                                <div className="flex flex-col">
                                <label >
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" type="text" values = "DocumentoCertificado" placeholder = "Suba el documentó que certifica la calidad de su café"/>
                                </label>
                                </div>

                                 <div className="flex flex-col">
                                <label>
                                    <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" type="text" values = "imagen" placeholder="Suba una imagen del café con orientación horizontal"/>
                                </label>
                                </div>

                                 <div className="flex flex-col">
                                <label>
                                    <input  className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer h-[50%] " type="text" values = "discripcion" placeholder="Descripcion de la subasta" required/>
                                </label>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                <button  onClick={() => alert("Datos Registrados Con Exito")} className="bg-slate-300 rounded-xl focus:outline-none focus:border-amber-700 px-3 py-2 cursor-pointer hover:border-black hover:bg-green-500 w-64" type="submit"><p className="font-semibold text-xl">Crear Subasta</p></button>
                                </div>
                                </div>
                            </form>
                            </div>

                            
                    </div>
                </div>
            </div>
    )
}

export default CrearSubasta