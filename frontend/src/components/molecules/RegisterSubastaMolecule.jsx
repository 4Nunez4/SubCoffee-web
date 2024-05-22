import React, { useEffect, useState } from "react";
import { Button, Input, ModalFooter, Textarea } from "@nextui-org/react";
import { useVariedadUserContext } from "../../context/VariedadUserContext";
import { useSubastaContext } from "../../context/SubastaContext";
import { icono } from "../atoms/IconsAtom";
import { useFincaContext } from "../../context/FincaContext";

const RegisterSubastaMolecule = ({ mode, titleBtn }) => {
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    unidadPeso: "",
    precioInicial: "",
    cantidad: "",
    imagen_sub: "",
    descripcion_sub: "",
    certificado_sub: "",
    variedad: "",
    finca: ""
  });

  const { idSubasta, createSubs, updateSubs } = useSubastaContext();
  const { getFincaUser, fincas = [] } = useFincaContext();  // Inicializar fincas como un array vacío
  const { variedadForuser = [], getVariForUser } = useVariedadUserContext();  // Inicializar variedadForuser como un array vacío
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getFincaUser(usuario.pk_cedula_user);
  }, [usuario.pk_cedula_user, getFincaUser]);

  const handleFincaChange = (e) => {
    const finca = e.target.value;
    setFormData(prevData => ({ ...prevData, finca, variedad: "" }));
    getVariForUser(usuario.pk_cedula_user, finca);
  };

  const handleVariedadChange = (e) => {
    const selectedVariedad = e.target.value;
    setFormData(prevData => ({ ...prevData, variedad: selectedVariedad }));
  };

  useEffect(() => {
    if (mode === "update" && idSubasta) {
      try {
        setFormData({
          fecha_inicio: idSubasta.fecha_inicio_sub,
          fecha_fin: idSubasta.fecha_fin_sub,
          unidadPeso: idSubasta.unidad_peso_sub,
          precioInicial: idSubasta.precio_inicial_sub,
          cantidad: idSubasta.cantidad_sub,
          imagen_sub: idSubasta.imagen_sub,
          descripcion_sub: idSubasta.descripcion_sub,
          variedad: idSubasta.fk_variedad,
          finca: idSubasta.fk_finca, 
          certificado_sub: idSubasta.certificado_sub || "",
        });
        // Cargar variedades correspondientes a la finca
        getVariForUser(usuario.pk_cedula_user, idSubasta.fk_finca);
      } catch (error) {
        console.error("Error en el sistema:", error);
      }
    }
  }, [mode, idSubasta, usuario.pk_cedula_user, getVariForUser]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("fecha_inicio_sub", formData.fecha_inicio);
      data.append("fecha_fin_sub", formData.fecha_fin);
      data.append("precio_inicial_sub", formData.precioInicial);
      data.append("unidad_peso_sub", formData.unidadPeso);
      data.append("cantidad_sub", formData.cantidad);
      data.append("imagen_sub", formData.imagen_sub);
      data.append("certificado_sub", formData.certificado_sub);
      data.append("descripcion_sub", formData.descripcion_sub);
      data.append("fk_variedad", formData.variedad);
      data.append("fk_finca", formData.finca); // Asegúrate de enviar la finca seleccionada

      if (mode === "create") {
        createSubs(data, usuario.pk_cedula_user);
      } else if (mode === "update") {
        updateSubs(data, idSubasta.pk_id_sub, usuario.pk_cedula_user);
      }
    } catch (error) {
      console.error("Error en el sistema: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      <div className="grid">
        <div className="flex w-full justify-center rounded-full">
          <input
            placeholder="Imagen de la subasta"
            type="file"
            name="imagen_sub"
            className="hidden"
            id="fileInput"
            onChange={handleChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer items-center w-auto flex justify-center bg-blue-100 rounded-xl border"
          >
            {formData.imagen_sub ? (
              <div className="relative">
                <button
                  type="button"
                  className="absolute -top-2 -right-2 p-1 bg-gray-300 rounded-xl"
                  onClick={() => setFormData({ ...formData, imagen_sub: "" })}
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
                    src={
                      typeof formData.imagen_sub === "string"
                        ? `http://localhost:4000/subasta/${formData.imagen_sub}`
                        : URL.createObjectURL(formData.imagen_sub)
                    }
                    alt="user"
                    className="h-28 w-40 object-cover rounded-xl mx-auto"
                  />
                ) : (
                  formData.imagen_sub instanceof File && (
                    <img
                      src={URL.createObjectURL(formData.imagen_sub)}
                      alt="user"
                      className="h-28 w-40 object-cover rounded-xl mx-auto"
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-40 h-28 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-300">
                <span className="text-gray-500 text-center">
                  Seleccionar imagen de la subasta
                </span>
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <Input
          placeholder="Fecha de Inicio"
          isRequired
          variant="bordered"
          type="datetime-local"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
          startContent={<icono.iconoFecha />}
        />
        <Input
          placeholder="Fecha Fin"
          isRequired
          variant="bordered"
          type="datetime-local"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
          startContent={<icono.iconoFecha />}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Input
          label=""
          aria-label="Precio Inicial"
          startContent={<icono.iconoPrice />}
          placeholder="Precio Inicial"
          isRequired
          variant="bordered"
          type="number"
          name="precioInicial"
          value={formData.precioInicial}
          onChange={handleChange}
        />
        <input type="file" name="" id="" />
      </div>
      <div className="grid grid-cols-2">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            {<icono.iconoQuantity />}
          </span>
          <select
            name="finca"
            value={formData.finca}
            onChange={handleFincaChange}
            required
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden>
              Seleccionar Finca
            </option>
            {fincas.length > 0 ? fincas.filter((finca) => finca.estado_fin === "activo").map((finca) => (
              <option value={finca.pk_id_fin} key={finca.pk_id_fin}>
                {finca.nombre_fin}
              </option>
            )): (

            <option value="" className="text-gray-600">
              No has registrado ninguna finca
            </option> 
            )}
          </select>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            {<icono.iconoQuantity />}
          </span>
          <select
            name="variedad"
            value={formData.variedad}
            onChange={handleVariedadChange}
            required
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden>
              Seleccionar variedad
            </option>
            {variedadForuser.length > 0 ? variedadForuser.filter((variedad) => variedad.estado_vari === "activo").map((variedad) => (
              <option value={variedad.pk_id_vari} key={variedad.pk_id_vari}>
                {variedad.nombre_tipo_vari}
              </option>
            )): 
            <option value="" className="text-gray-600">
              Seleccionar finca o Finca sin variedades
            </option> 
            }
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            {<icono.iconoQuantity />}
          </span>
          <select
            name="unidadPeso"
            value={formData.unidadPeso}
            onChange={handleChange}
            required
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden>
              Seleccionar Unidad de peso
            </option>
            <option value="Libra">Libra</option>
            <option value="Gramo">Gramo</option>
            <option value="Kilogramo">Kilogramo</option>
            <option value="Tonelada">Tonelada</option>
          </select>
        </div>
        <Input
          label=""
          aria-label="Cantidad"
          variant="bordered"
          startContent={<icono.iconoQuantity />}
          placeholder="Cantidad"
          isRequired
          name="cantidad"
          type="number"
          value={formData.cantidad}
          onChange={handleChange}
        />
      </div>
      <Textarea
        label=""
        aria-label="Descripción de la subasta"
        startContent={<icono.iconoDescript />}
        variant="bordered"
        placeholder="Ingresa la descripción de la subasta"
        disableAnimation
        disableAutosize
        classNames={{
          base: "w-full",
          input: "resize-y min-h-[40px]",
        }}
        value={formData.descripcion_sub}
        onChange={handleChange}
        name="descripcion_sub"
      />
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterSubastaMolecule;
