import React, { useContext, useEffect, useState } from "react";
import { Button, ModalFooter, Select, SelectItem, Textarea, user } from "@nextui-org/react";

import { icono } from "../atoms/IconsAtom";
import FincaContext from "../../context/FincaContext";
import VariedadUserContext from "../../context/VariedadUserContext";
import TipoVariContext from "../../context/TipoVariContext";

const RegisterVariedadUserMolecule = ({ mode, onClose, titleBtn }) => {
  const [formData, setFormData] = useState({
    imagen: "",
    fincasRef: "",
    tipoVariRef: "",
    descripcion_vari: ""
  });

  const users = JSON.parse(localStorage.getItem("user"));

  const { getFinca, fincas } = useContext(FincaContext)
  const { idVariedad, createVaris, updateVaris, errors } = useContext(VariedadUserContext)
  const { getTipoVariedades, tipoVariedades } = useContext(TipoVariContext)

  useEffect(()=> {
    getTipoVariedades()
  }, [])

  useEffect(() => {
    getFinca(users.pk_cedula_user)
  }, [])
  
  useEffect(() => {
    if (mode === "update" && idVariedad) {
      try {
        setFormData({
          ...formData,
          imagen: idVariedad.imagen_vari,
          descripcion_vari: idVariedad.descripcion_vari,
          tipoVariRef: idVariedad.fk_tipo_variedad,
          fincasRef: idVariedad.fk_finca
        });
      } catch (error) {
        console.error("Error en el sistema:", error);
      }
    }
  }, [mode, idVariedad]);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("descripcion_vari", formData.descripcion_vari);
      data.append("img", formData.imagen);
      data.append("fk_finca", formData.fincasRef);
      data.append("fk_tipo_variedad", formData.tipoVariRef);

      if (mode === "update") {
        updateVaris(idVariedad.pk_id_vari, data, users.pk_cedula_user)
      } else {
        createVaris(data, users.pk_cedula_user)
      }
    } catch (error) {
      console.error("Error del sistema:", error);
    }
  };

  const handleChange = (e, fieldName) => {
    const { name, value, files } = e.target;
    const newValue = name === "imagen" ? files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
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
          onChange={(e) => handleChange(e, "imagen")}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer items-center w-auto flex justify-center bg-blue-100 rounded-xl border"
        >
          {formData.imagen ? (
            <div className="relative">
              <button
                type="button"
                className="absolute -top-2 -right-2 p-1 bg-gray-300 rounded-xl"
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
                  src={typeof formData.imagen === "string" ? `http://localhost:4000/variedades/${formData.imagen}` : URL.createObjectURL(formData.imagen)}
                  alt="user"
                  className="h-28 w-28 object-cover rounded-xl mx-auto"
                />
              ) : (
                formData.imagen instanceof File && (
                  <img
                    src={URL.createObjectURL(formData.imagen)}
                    alt="user"
                    className="h-28 w-28 object-cover rounded-xl mx-auto"
                  />
                )
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-28 h-28 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-300">
              <span className="text-gray-500 text-center">
                Seleccionar imagen
              </span>
            </div>
          )}
        </label>
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoDepar />}
        </span>
        <select
          name="fincasRef"
          value={formData.fincasRef}
          onChange={(e) => handleChange(e, "fincasRef")}
          required={true}
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-400">
            Seleccionar Finca
          </option>
          {fincas.filter((finca) => finca.estado_fin === "activo").map((finca) => (
            <option
              key={finca.pk_id_fin}
              value={finca.pk_id_fin}
            >
              {finca.nombre_fin}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoDepar />}
        </span>
        <select
          name="tipoVariRef"
          value={formData.tipoVariRef}
          onChange={(e) => handleChange(e, "tipoVariRef")}
          required={true}
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-400">
            Seleccionar Variedad
          </option>
          {tipoVariedades.filter((variedad) => variedad.estado_tipo_vari === "activo").map((variedad) => (
            <option
              key={variedad.pk_id_tipo_vari}
              value={variedad.pk_id_tipo_vari}
            >
              {variedad.nombre_tipo_vari}
            </option>
          ))}
        </select>
      </div>
      <Textarea
        label="Descripción de la variedad"
        startContent={<icono.iconoDescript />}
        variant="bordered"
        placeholder="Ingresa la descripción de de variedad"
        disableAnimation
        disableAutosize
        classNames={{
          base: "w-full",
          input: "resize-y min-h-[40px]",
        }}
        value={formData.descripcion_vari}
        onChange={(e) => handleChange(e, "descripcion_vari")}
        name="descripcion_vari"
      />
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterVariedadUserMolecule;
