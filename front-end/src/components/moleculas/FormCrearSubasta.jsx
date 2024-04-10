import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

function FormCrearSubasta(){

    const baseURL = 'localhost:4000/produccion/registrar'

    const pk_id_pro = useRef(null)
    const cantidad_pro = useRef(null)
    const fk_id_variedad = useRef(null)
    const fk_id_finca = useRef(null)
    const estado_pro = useRef(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
   
    try {
      const data = {
            pk_id_pro: pk_id_pro.current.value,
            cantidad_pro: cantidad_pro.current.value,
            fk_id_variedad: fk_id_variedad.current.value,
            fk_id_finca: fk_id_finca.current.value,
            estado_pro: estado_pro.current.value
      }
      axios.post(baseURL, data).then((response) => {
        console.log(response)
        if(response.status == 201){
            alert('produccion')
        }else{
            alert('produccion')
        }
      })
    }
    catch(error){
            console.log('NOT', error)
    }

     }

        const baseURLLISTAR = 'http://localhost:4000/produccion/listar'
    const [variedad, setVariedad] = useState([])

    useEffect(() => {
    try {
      axios.get( baseURLLISTAR, {
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwa19jZWR1bGFfdXNlciI6MTA4NDI1MTg4OSwibm9tYnJlX3VzZXIiOiJKdWFuIENhbWlsbyBSZWFscGUiLCJlbWFpbF91c2VyIjoianVhbkBnbWFpbC5jb20iLCJwYXNzd29yZF91c2VyIjoiMTIzNDU2Nzg5IiwiZGVzY3JpcGNpb25fdXNlciI6IlNveSB1biBjaGljbyBhbWlnYWJsZSIsImltYWdlbl91c2VyIjoiIiwidGVsZWZvbm9fdXNlciI6IjMxNTc4NzQ1OTMiLCJmZWNoYV9uYWNpbWllbnRvX3VzZXIiOiIyMDA1LTA2LTE3VDA1OjAwOjAwLjAwMFoiLCJyb2xfdXNlciI6ImFkbWluIiwiZXN0YWRvX3VzZXIiOm51bGx9XSwiaWF0IjoxNzEyNzEzMTQ2LCJleHAiOjE3MTI3OTk1NDZ9.LqnN7bgaQtuY1gSSzuZXFUAcFmcneakHysY3geIvVwE"
        }
      }).then((response) => {
        console.log(response)
        setVariedad(response.data)
      })
    }
    catch(error){
        console.log("ERROR SERVIOR", error)
    }
  })

    return(

        <div className="flex flex-col">

        <div className="flex flex-col z-10 ">
            <p className="flex flex-col justify-center items-center text-xl font-semibold z-10">Crear Tu Subasta Ya</p>
            <p className="flex flex-col justify-center items-center text-xl mb-4 z-10 f
            
            ont-semibold">¡Subasta Tu pasión y despierta el aroma del éxito!</p> 
        </div>

            <form method='post' onSubmit={handleSubmit}>
                <div className='flex flex-col'> 

                    <div className="flex flex-col">
                        <select className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        values="variedad"
                        ref={fk_id_variedad}>

                        <option>Tipo de variedad</option>
                        {variedad.map(vari => (
                            <option key={vari.tipo_vari} value={vari.tipo_vari}>
                            {vari.tipo_vari}
                            </option>
                        ))}
                        </select>

                    </div>   

                    <div className="flex flex-col">
                        <select className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer"
                        values = "factor" 
                        placeholder= "PuntuacionFactor"  
                        ref={fk_id_variedad}>

                        <option>Puntuacion/Factor</option>
                        {variedad.map(vari2 => (
                            <option key={vari2. puntuacion_vari} value={vari2.puntuacion_vari}>
                            {vari2.puntuacion_vari}
                            </option>
                        ))} 
                        </select>
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
                        <select  className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="text" 
                        values = "discripcion" 
                        placeholder="Descripcion de la subasta" 
                        ref={fk_id_variedad} >
                        <option>Descripcion variedad a subastar</option>
                        {variedad.map(vari3 => (
                            <option key={vari3.descripcion_vari} value={vari3.descripcion_vari} >
                            {vari3.descripcion_vari}
                            </option>

                        ))}
                        </select>

                        <button>Hola Crea tu subasta </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormCrearSubasta