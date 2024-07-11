import React, { useEffect, useState } from "react";
import { Button, ModalFooter, Input } from "@nextui-org/react";

import { useFincaContext } from "../../context/FincaContext";
import { useDepartContext } from "../../context/DeparContext";
import { icono } from "../atoms/IconsAtom";
import { useMunicipioContext } from "../../context/MunicipioContext";
import { useVeredaContext } from "../../context/VeredaContext";

const RegisterFincaMolecule = ({ mode, titleBtn }) => {
  const [formData, setFormData] = useState({
    nombre_fin: "",
    departamento: "",
    municipio: "",
    vereda: "",
    imagen_fin: "",
    latitud_fin: "",
    longitud_fin: "",
  });

  const { idFinca, createFincas, updateFincas, errors } = useFincaContext();
  const { departamentos, getDepartamentos } = useDepartContext();
  const { getMunisForDeparActivos, municipiosActivos, setMunicipiosActivos } = useMunicipioContext();
  const { getVeresForMuni, veredasForMuni, setVeredasForMuni } = useVeredaContext();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getDepartamentos();
  }, []);

  useEffect(() => {
    if (mode === "update" && idFinca) {
      setFormData({
        nombre_fin: idFinca.nombre_fin,
        imagen_fin: idFinca.imagen_fin,
        departamento: idFinca.fk_departamento,
        municipio: idFinca.fk_municipio,
        vereda: idFinca.fk_vereda,
        latitud_fin: idFinca.latitud_fin,
        longitud_fin: idFinca.longitud_fin,
      });
      getMunisForDeparActivos(idFinca.fk_departamento);
      getVeresForMuni(idFinca.fk_municipio);
    } else {
      setMunicipiosActivos([]);
      setVeredasForMuni([]);
    }
  }, [mode, idFinca]);

  const handleDepartamentoChange = (departamento) => {
    setFormData((prevData) => ({
      ...prevData,
      departamento,
      municipio: "",
      vereda: "",
    }));
    getMunisForDeparActivos(departamento);
  };

  const handleMunicipioChange = (e) => {
    const selectedMunicipio = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      municipio: selectedMunicipio,
      vereda: "",
    }));
    getVeresForMuni(selectedMunicipio);
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("nombre_fin", formData.nombre_fin);
      data.append("imagen_fin", formData.imagen_fin);
      data.append("fk_vereda", formData.vereda);
      data.append("longitud_fin", formData.longitud_fin);
      data.append("latitud_fin", formData.latitud_fin);
      if (mode === "update") {
        updateFincas(idFinca.pk_id_fin, data, user.pk_cedula_user);
      } else {
        data.append("fk_id_usuario", user.pk_cedula_user);
        createFincas(data, user.pk_cedula_user);
      }
    } catch (error) {
      console.error("Error del sistema:", error);
    }
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
      <div className="flex w-full justify-center rounded-xl">
        <input
          placeholder="Imagen de usuario"
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
                className="absolute -top-3 -right-3 p-2 bg-gray-300 rounded-full"
                onClick={() => setFormData({ ...formData, imagen_fin: "" })}
              >
                <icono.iconoCambiar/>
              </button>
              {mode === "update" ? (
                <img
                  src={
                    typeof formData.imagen_fin === "string"
                      ? `http://localhost:4000/fincas/${formData.imagen_fin}`
                      : URL.createObjectURL(formData.imagen_fin)
                  }
                  alt="finca"
                  className="h-28 w-48 object-cover rounded-xl mx-auto"
                />
              ) : (
                formData.imagen_fin instanceof File && (
                  <img
                    src={URL.createObjectURL(formData.imagen_fin)}
                    alt="finca"
                    className="h-28 w-48 object-cover rounded-xl mx-auto"
                  />
                )
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
        required
        type="text"
        name="nombre_fin"
        value={formData.nombre_fin}
        onChange={handleChange}
      />
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoDepar />}
        </span>
        <select
          name="departamento"
          value={formData.departamento}
          onChange={(e) => handleDepartamentoChange(e.target.value)}
          required
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
          required
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-600">
            Seleccionar Municipio
          </option>
          {municipiosActivos.length > 0 ? (
            municipiosActivos.map(({ pk_codigo_muni, nombre_muni }) => (
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
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoMuni />}
        </span>
        <select
          name="vereda"
          value={formData.vereda}
          onChange={handleChange}
          required
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
      <div className="flex gap-x-3">
        <Input
          label=""
          aria-label="Latitud de la Finca"
          startContent={<icono.iconoNumber />}
          placeholder="Latitud de la Finca"
          variant="bordered"
          required
          min={0}
          type="number"
          name="latitud_fin"
          value={formData.latitud_fin}
          onChange={handleChange}
        />
        <Input
          label=""
          aria-label="Longitud de la Finca"
          startContent={<icono.iconoNumber />}
          placeholder="Longitud de la Finca"
          variant="bordered"
          required
          min={0}
          type="number"
          name="longitud_fin"
          value={formData.longitud_fin}
          onChange={handleChange}
        />
      </div>
      <ModalFooter className="flex justify-center">
        <Button
          type="submit"
          className="text-white bg-[#39A800] h-10 w-36 rounded-lg font-bold flex justify-center items-center"
        >
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterFincaMolecule;
