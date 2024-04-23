import React, { useRef, useEffect } from "react";
import axiosClient from "../../api/axios";
import ButtonAtom from "../atoms/ButtonAtom";
import InputWithToggleIconAtom from "../atoms/InputWithToggleIconAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import SelectInputAtom from "../atoms/SelectInputAtom";
import OptionAtom from "../atoms/OptionAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";

const RegisterFormMolecule = ({ onClose, mode, userId }) => {
  const cedula = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phoneNumber = useRef(null);
  const birthdate = useRef(null);
  const rol = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (mode === "update" && userId) {
        try {
          const response = await axiosClient.get(`/v1/users/${userId}`);
          const userData = response.data;

          cedula.current.value = userData.cedula_user;
          fullName.current.value = userData.nombre_user;
          email.current.value = userData.email_user;
          phoneNumber.current.value = userData.telefono_user;
          birthdate.current.value = userData.fechanacimiento_user;
          rol.current.value = userData.rol_user;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [mode, userId]);

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

    try {
      let response;
      if (mode === "create") {
        response = await axiosClient.post("/v1/users", data);
      } else if (mode === "update" && userId) {
        response = await axiosClient.put(`/v1/users/${userId}`, data);
      }

      if (response.status === 200) {
        toast.success("Usuario registrado/actualizado con éxito", {duration: 2000});
        onClose();
      } else {
        toast.error("Error al registrar/actualizar el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar/actualizar el usuario");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TitleForModal>
        {mode === "update" ? "Actualizar Usuario" : "Registrar Usuario"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre Completo"
        required
        type="text"
        ref={fullName}
      />
      <div className="grid grid-cols-2 items-center">
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
      <div className="grid grid-cols-2 items-center">
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
      <center>
        <ButtonAtom type="submit">
          {mode === "update" ? "Actualizar" : "Registrar"}
        </ButtonAtom>
      </center>
    </form>
  );
};

export default RegisterFormMolecule;
