import React, { useState, useEffect, useContext } from "react";
import { Button, ModalFooter, Input, Textarea } from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../../nextui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../nextui/EyeFilledIcon";
import { icono } from "../atoms/IconsAtom";
import AuthContext from "../../context/AuthContext";

const RegisterUser = ({ mode, titleBtn, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { createUsers, updateUsers, idUser, errors, onClose :CerrarModal } = useContext(AuthContext);
  const userAdmin = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    imagen: "",
    pk_cedula_user: "",
    nombre_user: "",
    email_user: "",
    password_user: "",
    telefono_user: "",
    rol_user: "",
    descripcion_user: "",
  });

  useEffect(() => {
    if (mode === "update" && idUser) {
      setFormData({
        imagen: idUser.imagen_user,
        pk_cedula_user: idUser.pk_cedula_user,
        nombre_user: idUser.nombre_user,
        email_user: idUser.email_user,
        telefono_user: idUser.telefono_user,
        rol_user: idUser.rol_user,
        descripcion_user: idUser.descripcion_user,
      });
    }
  }, [mode, idUser]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const datosAEnviar = new FormData();
    datosAEnviar.append("imagen_user", formData.imagen);
    datosAEnviar.append("pk_cedula_user", formData.pk_cedula_user);
    datosAEnviar.append("nombre_user", formData.nombre_user);
    datosAEnviar.append("email_user", formData.email_user);
    datosAEnviar.append("telefono_user", formData.telefono_user);
    datosAEnviar.append("rol_user", formData.rol_user);
    try {
      if (mode === "update") {
        datosAEnviar.append("descripcion_user", formData.descripcion_user);
        await updateUsers(idUser.pk_cedula_user, datosAEnviar);
      } else {
        datosAEnviar.append("password_user", formData.password_user);
        await createUsers(datosAEnviar);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 px-4">
      {
        errors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
            {error}
          </div>
        ))
      }
      <div className="flex w-full justify-center rounded-full">
        <input
          placeholder="Imagen de usuario"
          type="file"
          name="imagen"
          className="hidden"
          id="fileInput"
          onChange={handleChange}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer items-center w-auto flex justify-center bg-blue-100 rounded-full border"
        >
          {formData.imagen ? (
            <div className="relative">
              <button
                type="button"
                className="absolute top-0 right-0 p-1 bg-gray-300 rounded-full"
                onClick={() => setFormData({ ...formData, imagen: "" })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {mode === "update" ? (
                <img
                  src={typeof formData.imagen === "string" ? `http://localhost:4000/img/${formData.imagen}` : URL.createObjectURL(formData.imagen)}
                  alt="user"
                  className="h-28 w-28 object-cover rounded-full mx-auto"
                />
              ) : (
                formData.imagen instanceof File && (
                  <img
                    src={URL.createObjectURL(formData.imagen)}
                    alt="user"
                    className="h-28 w-28 object-cover rounded-full mx-auto"
                  />
                )
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-28 h-28 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
              <span className="text-gray-500 text-center">
                Seleccionar imagen
              </span>
            </div>
          )}
        </label>
      </div>
      <Input
        placeholder="Nombre Completo"
        isRequired
        type="text"
        name="nombre_user"
        variant="bordered"
        value={formData.nombre_user}
        onChange={handleChange}
        startContent={<icono.iconoUser />}
      />
      <Input
          placeholder="Correo"
          isRequired
          type="email"
          variant="bordered"
          name="email_user"
          value={formData.email_user}
          onChange={handleChange}
          startContent={<icono.iconoGmail />}
        />
      <div className="grid grid-cols-2 items-center gap-x-2">
        <Input
          placeholder="Cédula"
          isRequired
          type="number"
          variant="bordered"
          min={0}
          name="pk_cedula_user"
          value={formData.pk_cedula_user}
          onChange={handleChange}
          startContent={<icono.iconoCedula />}
        />
        <Input
          placeholder="Teléfono"
          isRequired
          type="number"
          variant="bordered"
          min={0}
          name="telefono_user"
          value={formData.telefono_user}
          onChange={handleChange}
          startContent={<icono.iconoCelular />}
        />
      </div>
      <div className={`grid ${mode !== "update" ? "grid-cols-2" : "grid-cols-1"} items-center gap-x-2`}>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            {<icono.iconoRol />}
          </span>
          <select
            name="rol_user"
            value={formData.rol_user}
            onChange={handleChange}
            required
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden>
              Seleccionar Rol
            </option>
            {userAdmin.rol_user === "admin" && (
              <option value="admin">Administrador</option>
            )}
            <option value="comprador">Comprador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>
        {mode !== "update" && (
          <Input
            label=""
            aria-label="Contraseña"
            variant="bordered"
            placeholder="Contraseña"
            startContent={<icono.iconoContraseña />}
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                className="focus:outline-none"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={formData.password_user}
            name="password_user"
            onChange={handleChange}
          />
        )}
      </div>
      {
        mode === "update" && (
          <Textarea
            label=""
            aria-label="Descripción de usuario"
            startContent={<icono.iconoDescript />}
            variant="bordered"
            placeholder="Ingresa la descripción de usuario"
            classNames={{
              base: "w-full",
              input: "resize-y min-h-[40px]",
            }}
            value={formData.descripcion_user || ''}
            onChange={handleChange}
            name="descripcion_user"
          />
        )
      }
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterUser;
