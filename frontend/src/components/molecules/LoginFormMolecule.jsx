import React, { useRef } from "react";

import LinkAtom from "../atoms/LinkAtom";
import InputWithToggleIconAtom from "../atoms/InputWithToggleIconAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { icono } from "../atoms/IconsAtom";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import TitleForModal from "../atoms/TitleForModal";

const LoginFormMolecule = ({ handleSubmit }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        correo: emailRef.current.value,
        password: passwordRef.current.value,
      };
      handleSubmit(data, e)
    } catch (error) {
      toast.error("Error del sistema:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        Iniciar Sesión
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoGmail}
        placeholder="Correo electrónico"
        required
        type="email"
        ref={emailRef}
      />
      <InputWithToggleIconAtom
        icon={icono.iconoContraseña}
        placeholder="Contraseña"
        required
        type="password"
        ref={passwordRef}
      />
      <LinkAtom to="/">¿Olvidaste tu contraseña?</LinkAtom>
      <br />
      <center>
        <Button type="submit" className="bg-gray-600 text-white">
          Iniciar Sesión
        </Button>
      </center>
    </form>
  );
};

export default LoginFormMolecule;
