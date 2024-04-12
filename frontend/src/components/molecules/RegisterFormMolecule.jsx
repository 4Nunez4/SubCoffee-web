import React, { useRef } from "react";
import axios from "axios";

import ButtonAtom from "../atoms/ButtonAtom";
import InputWithToggleIconAtom from "../atoms/InputWithToggleIconAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { icono } from "../atoms/IconsAtom";
import SelectInputAtom from "../atoms/SelectInputAtom";
import OptionAtom from "../atoms/OptionAtom";
import toast from "react-hot-toast";
import axiosClient from "../../api/axios";

const RegisterFormMolecule = ({ onClose }) => {
  const cedula = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phoneNumber = useRef(null);
  const birthdate = useRef(null);
  const rol = useRef(null);
  const URL = "http://localhost:9722/v1/users";

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      cedula_user: cedula.current.value,
      nombre_user: fullName.current.value,
      email_user: email.current.value,
      password_user: password.current.value,
      telefono_user: phoneNumber.current.value,
      fechanacimiento_user: birthdate.current.value,
      rol_user: rol.current.value,
    };

    await axiosClient
      .post("/v1/users", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Usuario registrado con éxito, ya puedes loguearte", {
            duration: 2000,
          });
          onClose();
        } else {
          toast.error("Error al registrar el usuario");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre Completo"
        required
        type="text"
        ref={fullName}
      />
      <div className="grid grid-cols-2 space-x-2">
        <InputWithIconAtom
          icon={icono.iconoCedula}
          placeholder="Cédula"
          required
          type="number"
          ref={cedula}
        />
        <InputWithIconAtom
          icon={icono.iconoFecha}
          placeholder="Fecha de Nacimiento"
          required
          type="date"
          ref={birthdate}
        />
      </div>
      <InputWithIconAtom
        icon={icono.iconoGmail}
        placeholder="Correo"
        required
        type="email"
        ref={email}
      />
      <div className="grid grid-cols-2 space-x-2 items-center">
        <InputWithIconAtom
          icon={icono.iconoCelular}
          placeholder="Teléfono"
          required
          type="number"
          ref={phoneNumber}
        />
        <SelectInputAtom ref={rol}>
          <OptionAtom value="vendedor" label="Vendedor" />
          <OptionAtom value="comprador" label="Comprador" />
        </SelectInputAtom>
      </div>
      <InputWithToggleIconAtom
        icon={icono.iconoContraseña}
        placeholder="Contraseña"
        required
        type="password"
        ref={password}
      />
      <div className="flex mt-4 gap-x-2">
        <input type="checkbox" />
        <p className="text-grisMedio2">Acepta terminos y condiciones</p>
      </div>
      <center>
        <ButtonAtom type="submit">Registrarse</ButtonAtom>
      </center>
    </form>
  );
};

export default RegisterFormMolecule;
