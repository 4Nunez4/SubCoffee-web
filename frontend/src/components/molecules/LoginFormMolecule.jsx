import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LinkAtom from "../atoms/LinkAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import InputWithToggleIconAtom from "../atoms/InputWithToggleIconAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { icono } from "../atoms/IconsAtom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";

const LoginFormMolecule = () => {
  const navigation = useNavigate();
  const { setUsers } = useContext(AuthContext);
  const URL = "http://localhost:4000/auth/login";

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      correo: emailRef.current.value,
      password: passwordRef.current.value,
    };

    await axios
      .post(URL, data)
      .then((res) => {
        if (res.status === 200) {
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user))
          navigation("/subcoffee");
          setUsers(user)
          toast.success("Usuario validado con éxito", { duration: 5000 });
        } else if (res.status === 401) {
          toast.error("Usuario no registrado");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
        <ButtonAtom type="submit">Iniciar Sesión</ButtonAtom>
      </center>
    </form>
  );
};

export default LoginFormMolecule;
