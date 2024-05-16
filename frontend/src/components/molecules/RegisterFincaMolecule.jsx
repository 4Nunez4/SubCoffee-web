import React, { useContext, useEffect, useState } from "react";
import { Button, ModalFooter, Input, Textarea } from "@nextui-org/react";

import FincaContext from "../../context/FincaContext";
import DeparContext from "../../context/DeparContext";
import { icono } from "../atoms/IconsAtom";
import MunicipioContext from "../../context/MunicipioContext";
import VeredaContext from "../../context/VeredaContext";

const RegisterFincaMolecule = ({ mode, onClose, titleBtn }) => {
  const [formData, setFormData] = useState({
    nombre_fin: "",
    descripcionFin: "",
    departamento: "",
    municipio: "",
    vereda: "",
    imagen_fin: "",
  });

  const { idFinca, createFincas, updateFincas } = useContext(FincaContext);
  const { departamentos, getDepartamentos } = useContext(DeparContext);
  const { getMunisForDepar, municipiosForDepar, setMunicipiosForDepar } = useContext(MunicipioContext);
  const { getVeresForMuni, veredasForMuni, setVeredasForMuni } = useContext(VeredaContext)

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getDepartamentos();
  }, []);

  useEffect(() => {
    if (mode === "update" && idFinca) {
      setFormData({
        nombre_fin: idFinca.nombre_fin,
        imagen_fin: idFinca.imagen_fin,
        descripcionFin: idFinca.descripcion_fin,
        departamento: idFinca.fk_departamento,
        municipio: idFinca.fk_municipio,
        vereda: idFinca.fk_vereda,
      });
      getMunisForDepar(idFinca.fk_departamento);
      getVeresForMuni(idFinca.fk_municipio)
    } else {
      setMunicipiosForDepar([])
      setVeredasForMuni([])
    }
  }, [mode, idFinca]);

  const handleDepartamentoChange = (departamento) => {
    setFormData((prevData) => ({ ...prevData, departamento, municipio: "", vereda: "", }));
    getMunisForDepar(departamento);
  };

  const handleMunicipioChange = (e) => {
    const selectedMunicipio = e.target.value;
    setFormData((prevData) => ({ ...prevData, municipio: selectedMunicipio, vereda: "", }));
    getVeresForMuni(selectedMunicipio);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("nombre_fin", formData.nombre_fin);
      data.append("imagen_fin", formData.imagen_fin);
      data.append("descripcion_fin", formData.descripcionFin);
      data.append("fk_id_usuario", user.pk_cedula_user);
      data.append("fk_vereda", formData.vereda);

      if (mode === "update") {
        updateFincas(idFinca.pk_id_fin, data, user.pk_cedula_user);
      } else {
        createFincas(data, user.pk_cedula_user);
      }
      onClose();
    } catch (error) {
      console.error("Error del sistema:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      <div className="flex w-full justify-center rounded-xl">
        <input
          placeholder="Imagen de usuario"
          required
          type="file"
          name="imagen_fin"
          className="hidden"
          id="fileInput"
          onChange={handleChange}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer items-center w-48 flex justify-center bg-blue-100 rounded-xl border"
        >
          {formData.imagen_fin ? (
            <div className="relative">
              <button
                type="button"
                className="absolute -top-3 -right-3 p-1 bg-gray-300 rounded-full"
                onClick={() => setFormData({ ...formData, imagen_fin: "" })}
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
                  src={typeof formData.imagen_fin === "string" ? `http://localhost:4000/fincas/${formData.imagen_fin}` : URL.createObjectURL(formData.imagen_fin)}
                  alt="imagen_fin"
                  className="h-28 w-48 object-cover rounded-xl mx-auto"
                />
              ) : (
                <img
                  src={URL.createObjectURL(formData.imagen_fin)}
                  alt="imagen_fin"
                  className="h-28 w-48 object-cover rounded-xl mx-auto"
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-48 h-28 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-300">
              <span className="text-gray-500 text-center">
                Seleccionar imagen
              </span>
            </div>
          )}
        </label>
      </div>
      <Input
        label=""
        aria-label="Nombre de la Finca"
        startContent={<icono.iconoNamePropiedad />}
        placeholder="Nombre de la Finca"
        variant="bordered"
        isRequired
        type="text"
        name="nombre_fin"
        value={formData.nombre_fin}
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 gap-x-2">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            {<icono.iconoDepar />}
          </span>
          <select
            name="departamento"
            value={formData.departamento}
            onChange={(e) => handleDepartamentoChange(e.target.value)}
            required={true}
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden className="text-gray-400">
              Seleccionar Departamento
            </option>
            {departamentos.map(({ pk_codigo_depar, nombre_depar }) => (
              <option key={pk_codigo_depar} value={pk_codigo_depar}>
                {nombre_depar}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            {<icono.iconoMuni />}
          </span>
          <select
            name="municipio"
            value={formData.municipio}
            onChange={handleMunicipioChange}
            required={true}
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden className="text-gray-600">
              Seleccionar Municipio
            </option>
            {municipiosForDepar.length > 0 ? (
              municipiosForDepar.map(({ pk_codigo_muni, nombre_muni }) => (
                <option key={pk_codigo_muni} value={pk_codigo_muni}>
                  {nombre_muni}
                </option>
              ))
            ) : (
              <option value="" className="text-gray-600">
                Por favor seleccionar un departamento
              </option>
            )}
          </select>
        </div>
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoMuni />}
        </span>
        <select
          name="vereda"
          value={formData.vereda}
          onChange={handleChange}
          required={true}
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-600">
            Seleccionar Vereda
          </option>
          {veredasForMuni.length > 0 ? (
            veredasForMuni.map(({ pk_id_vere, nombre_vere }) => (
              <option key={pk_id_vere} value={pk_id_vere}>
                {nombre_vere}
              </option>
            ))
          ) : (
            <option value="" className="text-gray-600">
              Por favor seleccionar un municipio
            </option>
          )}
        </select>
      </div>
      <Textarea
        label=""
        aria-label="Descripción de la finca"
        startContent={<icono.iconoDescript />}
        variant="bordered"
        placeholder="Descripción de la finca"
        disableAnimation
        disableAutosize
        classNames={{
          base: "w-full",
          input: "resize-y min-h-[40px]",
        }}
        value={formData.descripcionFin}
        onChange={handleChange}
        name="descripcionFin"
      />
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterFincaMolecule;
