import React, {  useRef } from "react";
import axios from "axios";
import InputForm from "../atomos/InputForm.jsx";
import TextForm from "../atomos/TextForm.jsx";
import SelectForm from "../atomos/SelectForm.jsx";
import BotonForm from "../atomos/BotonForm.jsx";

function Registro(){

    const baseURL = "http://localhost:4000/usuario/registrar"

        const pk_cedula_user = useRef(null)
        const nombre_user = useRef(null)
        const telefono_user  = useRef(null)
        const email_user = useRef(null)
        const descripcion_user = useRef(null)
        const password_user = useRef(null)
        const fecha_nacimiento_user = useRef(null)
        const rol_user = useRef(null)

    const funcion = async (e) => {
            e.preventDefault()
       
        try {
            const registrarUser = {
                pk_cedula_user: pk_cedula_user.current.value,
                nombre_user :nombre_user .current.value,
                telefono_user: telefono_user.current.value,
                email_user: email_user.current.value,
                descripcion_user: descripcion_user.current.value,
                password_user: password_user.current.value,
                fecha_nacimiento_user: fecha_nacimiento_user.current.value,
                rol_user: rol_user.current.value
            }

            axios.post(baseURL, registrarUser).then((response) =>{
            console.log(response)
            if(response.status == 201)
            {
                alert('User registrado')
            }else{
                alert('User registrado')
            }
           })
        } catch (error) {
            console.log('NOT', error)
        }
    }

        return(

            <div className="flex flex-col">
        
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">

                <div className=' flex flex-col justify-center bg-slate-50 shadow-md rounded-lg px-8 py-6 border max-w-[90%] max-h-[90%] auto-cols-auto border-stone-950 overflow-auto'>

                    <TextForm>Registro</TextForm>

            <form method='post' onSubmit={funcion}>

                <InputForm type="number" name="pk_cedula_user" placeholder="cedula" ref={pk_cedula_user} required/> <br/>

                <InputForm type="text" name="nombre_user" placeholder="nombre" ref={nombre_user} required/> <br/>

                <InputForm type="text" name="telefono_user" placeholder="telefono" ref={telefono_user} required/> <br/>

                <InputForm type="email" name="email_user" placeholder="correo" ref={email_user} required/> <br/>

                <InputForm type="password" name="password_user" placeholder="password" ref={password_user} required/> <br/>

                <InputForm type="date" name="fecha_nacimiento_user" placeholder="fecha_nacimiento" ref={fecha_nacimiento_user} required/> <br/>

                <SelectForm name="rol_user" ref={rol_user}>
                    <option value="admin">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="comprador">comprador</option>
                </SelectForm>

                <InputForm type="text" name="descripcion_user" placeholder='Descripcion' ref={descripcion_user} required /><br/>

                {/* <BotonForm>Registrar</BotonForm> */}

                <button>Hola</button>
            </form>

            </div>
            </div>
            </div>
        )
}

export default Registro