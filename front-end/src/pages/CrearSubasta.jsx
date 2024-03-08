function CrearSubasta(){
    return(

        <div className=" rounded-t-xl bg-white flex flex-col justify-center items-center p-5">

            <form className="flex flex-col justify-center bg-slate-200 w-6/12">

        <button className="flex flex-col bg-emerald-500 px-2.5 ml-2.5 mt-5 w-48 rounded-full left-80" 
        type="submit">Volver al inicio</button>

                <label className="border-black inset-y-5 p-5">Tipo de variedad
                    <input  className="" type="text" values = "variedad" placeholder="Tipo de variedad"/>
                </label>

                <label className="border-black inset-y-5 p-5" >Puntuacion/Factor
                    <input  type="number" values = "factor" placeholder="Puntuacion"/>
                </label>

                <label className="border-black inset-y-5 p-5">Cantidad
                    <input  type="text" values = "cantidad" placeholder="Cantidad"/>
                </label>

                <label className="border-black inset-y-5 p-5">Nombre del documento
                    <input type="text" values = "nombreDocumento" placeholder="Nombre del documento"/>
                </label>

                <label className="border-black inset-y-5 p-5">Documento
                    <input type="text" values = "Documento" placeholder="Documento"/>
                </label>

                <label className="border-black inset-y-5 p-5">Fecha Fin
                    <input type="date" values = "FechaFin"/>
                </label>

                <label className="border-black inset-y-5 p-5">Monto Inicial
                    <input type="number" values = "monto" placeholder="Monto Inicial"/>
                </label>

                <label className="border-black inset-y-5 p-5">Imagen
                    <input type="text" values = "imagen"/>
                </label>

                <label className="border-black inset-y-5 p-5">Descripcion
                    <input type="text" values = "discripcion" placeholder="Descripcion"/>
                </label>

                <button className="bg-orange-400 rounded-full left-2.5 right-3 top-0.5 space-x-4 backdrop-contrast-200" type="submit">Cancelar suabasta</button>

                <button className="bg-emerald-500 rounded-full left-2.5 right-3 bottom-px backdrop-contrast-200" type="submit">Crear Subasta</button>
            </form>
        </div>
    )
}

export default CrearSubasta