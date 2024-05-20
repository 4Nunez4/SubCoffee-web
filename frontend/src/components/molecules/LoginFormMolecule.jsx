import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, ModalFooter } from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../../nextui/EyeSlashFilledIcon"
import { EyeFilledIcon } from "../../nextui/EyeFilledIcon"
import { icono } from "../atoms/IconsAtom";
import AuthContext from "../../context/AuthContext";

const LoginFormMolecule = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { loginUsers, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

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
    if (isAuthenticated) return navigate("/subcoffee")
  }, [isAuthenticated])

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
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
        startContent={<icono.iconoContraseña/>}
        endContent={
          <button
            type="button"
            onClick={toggleVisibility}
          >
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
      <Link to="/" className="text-xs text-left underline hover:text-naranjaSena text-grisMedio3" >
        ¿Olvidaste tu contraseña?
      </Link>
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          Iniciar Sesión
        </Button>
      </ModalFooter>
    </form>
  );
};

export default LoginFormMolecule;
