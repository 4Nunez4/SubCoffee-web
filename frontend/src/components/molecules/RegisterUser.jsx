import React, { useRef, useEffect } from "react";
import InputWithToggleIconAtom from "../atoms/InputWithToggleIconAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import SelectInputAtom from "../atoms/SelectInputAtom";
import OptionAtom from "../atoms/OptionAtom";
import TitleForModal from "../atoms/TitleForModal";
import { icono } from "../atoms/IconsAtom";
import { Button } from "@nextui-org/react";

const RegisterFormMolecule = ({ mode, initialData, handleSubmit, actionLabel }) => {
  const cedula = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phoneNumber = useRef(null);
  const birthdate = useRef(null);
  const rol = useRef(null);

  useEffect(() => {
    if (mode === "update" && initialData) {
      try {
        console.log(initialData);

        cedula.current.value = initialData.cedula_user;
        fullName.current.value = initialData.nombre_user;
        email.current.value = initialData.email_user;
        phoneNumber.current.value = initialData.telefono_user;
        birthdate.current.value = initialData.fechanacimiento_user;
        rol.current.value = initialData.rol_user;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        cedula_user: cedula.current.value,
        nombre_user: fullName.current.value,
        email_user: email.current.value,
        password_user: password.current.value,
        telefono_user: phoneNumber.current.value,
        fechanacimiento_user: birthdate.current.value,
        rol_user: rol.current.value,
      };
      handleSubmit(data, e);
    } catch (error) {
      console.log(error);
      alert("Error en el servidor " + error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
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
        <Button type="submit" color="primary">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterFormMolecule;
