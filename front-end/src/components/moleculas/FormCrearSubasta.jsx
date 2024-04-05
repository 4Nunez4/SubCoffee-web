import React from "react";
import InputForm from "../atomos/AtomosFormulario/InputForm";
import SelectForm from "../atomos/AtomosFormulario/SelectForm";



function Registro(){
        return(
            <div className="flex flex-col">
            
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


                <button>Hola</button>
            </form>
            </div>
        )
}

export default Registro