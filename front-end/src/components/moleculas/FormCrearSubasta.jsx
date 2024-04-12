import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

function FormCrearSubasta(){
 
    const baseURL = 'http://localhost:4000/subasta/registrar'

    const fecha_inicio_sub = useRef(null)
    const fecha_fin_sub = useRef(null)
    const precio_inicial_sub = useRef(null)
    const precio_final_sub = useRef(null)
    const estado_sub = useRef(null)
    const fk_id_produccion = useRef(null)

    const handle = async (e) =>{
        e.preventDefault()
   
        try {
            const data = {
                    fecha_fin_sub: fecha_fin_sub.current.value,
                    fecha_inicio_sub: fecha_inicio_sub.current.value,
                    precio_inicial_sub: precio_inicial_sub.current.value,
                    precio_final_sub: precio_final_sub.current.value,
                    estado_sub: estado_sub.current.value,
                    fk_id_produccion: fk_id_produccion.current.value,
            }

            axios.post(baseURL, data, {
                headers: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwa19jZWR1bGFfdXNlciI6MTA4NDI1MTg4OSwibm9tYnJlX3VzZXIiOiJKdWFuIENhbWlsbyBSZWFscGUiLCJlbWFpbF91c2VyIjoianVhbkBnbWFpbC5jb20iLCJwYXNzd29yZF91c2VyIjoiMTIzNDU2Nzg5IiwiZGVzY3JpcGNpb25fdXNlciI6IlNveSB1biBjaGljbyBhbWlnYWJsZSIsImltYWdlbl91c2VyIjoiIiwidGVsZWZvbm9fdXNlciI6IjMxNTc4NzQ1OTMiLCJmZWNoYV9uYWNpbWllbnRvX3VzZXIiOiIyMDA1LTA2LTE3VDA1OjAwOjAwLjAwMFoiLCJyb2xfdXNlciI6ImFkbWluIiwiZXN0YWRvX3VzZXIiOm51bGx9XSwiaWF0IjoxNzEyODgzNzM3LCJleHAiOjE3MTI5NzAxMzd9.OWx0uLBUknBINFxn-VgjS-M86Cv5me8DdM2YWiYke3c"
                }
            }).then((response) => {
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


   const baseURLLISTARPro = 'http://localhost:4000/subasta/listar'

    const [produccion, setProduccion] = useState([])
    useEffect(() => {
    try {
      axios.get( baseURLLISTARPro, {
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwa19jZWR1bGFfdXNlciI6MTA4NDI1MTg4OSwibm9tYnJlX3VzZXIiOiJKdWFuIENhbWlsbyBSZWFscGUiLCJlbWFpbF91c2VyIjoianVhbkBnbWFpbC5jb20iLCJwYXNzd29yZF91c2VyIjoiMTIzNDU2Nzg5IiwiZGVzY3JpcGNpb25fdXNlciI6IlNveSB1biBjaGljbyBhbWlnYWJsZSIsImltYWdlbl91c2VyIjoiIiwidGVsZWZvbm9fdXNlciI6IjMxNTc4NzQ1OTMiLCJmZWNoYV9uYWNpbWllbnRvX3VzZXIiOiIyMDA1LTA2LTE3VDA1OjAwOjAwLjAwMFoiLCJyb2xfdXNlciI6ImFkbWluIiwiZXN0YWRvX3VzZXIiOm51bGx9XSwiaWF0IjoxNzEyODgzNzM3LCJleHAiOjE3MTI5NzAxMzd9.OWx0uLBUknBINFxn-VgjS-M86Cv5me8DdM2YWiYke3c"
        }
      }).then((response) => {
        console.log(response)
        setProduccion(response.data)
      })
    }
    catch(error){
        console.log("ERROR SERVIOR", error)
    }
  }, [])

    return(

        <div className="flex flex-col">

        <div className="flex flex-col z-10 ">
            <p className="flex flex-col justify-center items-center text-xl font-semibold z-10">Crear Tu Subasta Ya</p>
            <p className="flex flex-col justify-center items-center text-xl mb-4 z-10 font-semibold">¡Subasta Tu pasión y despierta el aroma del éxito!</p> 
        </div>

            <form method='post' onSubmit={handle}>
                <div className='flex flex-col'> 

                    {/* <div className="flex flex-col">
                        <select className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="text" 
                        values = "cantidad" 
                        placeholder="Cantidad de cafe" 
                        ref= {fk_id_produccion}>

                        <option>Cantidad kilos de cafe</option>
                        {produccion.map(pro => (
                            <option key={pro.pk_id_pro} value={pro.pk_id_pro}>
                            {pro.cantidad}
                            </option>
                        ))} 
                        </select>
                    </div> */}

                        <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="number" 
                        values = "monto" 
                        placeholder="fk_id_produccion" 
                        ref={fk_id_produccion}
                        />
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="number" 
                        values = "monto" 
                        placeholder="Monto inicial" 
                        ref={precio_inicial_sub}
                        />
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="number" 
                        values = "monto" 
                        placeholder="Monto final" 
                        ref={precio_final_sub}
                        />
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="date" 
                        values="FechaInicio" 
                        placeholder="Fecha inicio" 
                        ref={fecha_inicio_sub}/>
                    </div>

                    <div className="flex flex-col">
                        <input className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="date" 
                        values="FechaFin" 
                        placeholder="Fecha Fin" 
                        ref={fecha_fin_sub}/>
                    </div>

                    <div className="flex flex-col">
                        <select className="shadow-sm rounded-md px-3 py-2 w-full  border border-black focus:outline-none focus:border-blue-700 mb-2 top-4 cursor-pointer" 
                        type="date" 
                        values="FechaFin" 
                        placeholder="Fecha Fin" 
                        ref={estado_sub}>
                            <option>abierta</option>
                            <option>cerrada</option>
                            <option>espera</option>
                        </select>
                    </div>

                    {/* <div className="flex flex-col">
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
                    </div> */}

                        <button className="bg-green-500" type='submit'> Crear Subasta </button>
                </div>
            </form>
        </div>
    )
}

export default FormCrearSubasta