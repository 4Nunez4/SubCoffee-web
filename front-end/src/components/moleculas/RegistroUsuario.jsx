import React, {  useRef } from "react";
import axios from "axios";
import BotonForm from "BotonForm"


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
            <form method='post' onSubmit={funcion}>

                <input type="number" name="pk_cedula_user" placeholder="cedula" ref={pk_cedula_user} required/> <br/>
                <input type="text" name="nombre_user" placeholder="nombre" ref={nombre_user} required/> <br/>
                <input type="text" name="telefono_user" placeholder="telefono" ref={telefono_user} required/> <br/>
                <input type="email" name="email_user" placeholder="correo" ref={email_user} required/> <br/>
                <input type="password" name="password_user" placeholder="password" ref={password_user} required/> <br/>
                <input type="date" name="fecha_nacimiento_user" placeholder="fecha_nacimiento" ref={fecha_nacimiento_user} required/> <br/>

                <select name="rol_user" ref={rol_user}>
                    <option value="admin">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="comprador">comprador</option>
                </select>

                <input type="text" name="descripcion_user" placeholder='Descripcion' ref={descripcion_user} /><br/>

                <button type='submit'>Registrarse</button>
                <button>Listar</button>
            </form>
        )
}

export default Registro