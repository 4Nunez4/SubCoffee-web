import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../../nextui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../nextui/EyeFilledIcon";
import { icono } from "../atoms/IconsAtom";
import { useAuthContext } from "../../context/AuthContext";

const LoginFormMolecule = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { loginUsers, isAuthenticated, errors } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

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
    <form onSubmit={onSubmit} className="space-y-4 px-4 ">
      {
        errors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
            {error}
          </div>
        ))
      }
      <Input
        type="email"
        name="email"
        value={email}
        required
        isInvalid={isInvalid}
        placeholder="Correo electrónico"
        labelPlacement="outside"
        color={isInvalid ? "danger" : "default"}
        startContent={<icono.iconoGmail />}
        variant="bordered"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label=""
        aria-label="Contraseña"
        variant="bordered"
        required
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
      <Link to="/update-password" className="text-sm underline hover:text-[#39A800]">
        ¿Olvidaste tu contraseña?
      </Link>
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="text-[#FDFBF6] bg-[#39A800] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#FDFBF6]"> 
          Iniciar Sesión
        </Button>
      </ModalFooter>
    </form>
  );
};

export default LoginFormMolecule;
