import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, ModalFooter } from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../../nextui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../nextui/EyeFilledIcon";
import { icono } from "../atoms/IconsAtom";
import { useAuthContext } from "../../context/AuthContext";
import FormRecuperarPassword from "../templates/FormRecuperarPassword";

const LoginFormMolecule = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { loginUsers, isAuthenticated, errors } = useAuthContext();
  const [abrirModalPassword, setAbrirModalPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataForm = {
        correo: email,
        password: password,
      };
      loginUsers(dataForm);
    } catch (error) {
      console.error("Error del sistema:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) return navigate("/subcoffee");
  }, [isAuthenticated]);

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      <FormRecuperarPassword
        open={abrirModalPassword}
        onClose={() => setAbrirModalPassword(false)}
        title={"Recuperar contraseña"}
        titleBtn={"Recuperar"}
      />
      <Input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        labelPlacement="outside"
        startContent={<icono.iconoGmail />}
        variant="bordered"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label=""
        aria-label="Contraseña"
        variant="bordered"
        placeholder="Contraseña"
        startContent={<icono.iconoContraseña />}
        endContent={
          <button type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 " />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <a
        href="#RecuperarPassword"
        onClick={() => setAbrirModalPassword(true)}
        className={`cursor-pointer text-xs underline hover:text-[#009100] text-black`}
      >
        ¿Olvidaste tu contraseña?
      </a>
      <ModalFooter className="flex justify-center">
        <button type="submit"   className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#00ed64] hover:text-[#001e2b] transition-all ease-in-out duration-500"> 
          Iniciar Sesión
        </button>
      </ModalFooter>
    </form>
  );
};

export default LoginFormMolecule;
