import React, { useEffect, useState } from "react";
import { Button, Input, ModalFooter, Textarea } from "@nextui-org/react";
import { useVariedadUserContext } from "../../context/VariedadUserContext";
import { useSubastaContext } from "../../context/SubastaContext";
import { icono } from "../atoms/IconsAtom";
import { useFincaContext } from "../../context/FincaContext";
//import NotificacionContext from "../../context/NotificacionesContext";
//import addNotification from "react-push-notification"

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
    nombre_fin: "",
    //notificaciones--
    // tipo_not: "mensaje",
    // texto_not: "la suasta a iniciado empieza a subastar",
    // fk_id_subasta: pk_id_sub,
    // fk_id_usuario: pk_cedula_user,
    
  });
 //const {createNots }= NotificacionContext();
  const { idSubasta, createSubs, updateSubs } = useSubastaContext();
  const { getFincaUserActivas, fincasActivas = [] } = useFincaContext();
  const { variedadForuser = [], getVariForUser } = useVariedadUserContext();
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getFincaUserActivas(usuario.pk_cedula_user);
  }, [usuario.pk_cedula_user, getFincaUserActivas]);

  useEffect(() => {
    if (mode === "update" && idSubasta) {
      try {
        setFormData({
          fecha_inicio: idSubasta.fecha_inicio_sub ? new Date(idSubasta.fecha_inicio_sub).toISOString().slice(0, 16) : "",
          fecha_fin: idSubasta.fecha_fin_sub ? new Date(idSubasta.fecha_fin_sub).toISOString().slice(0, 16) : "",
          unidadPeso: idSubasta.unidad_peso_sub,
          precioInicial: idSubasta.precio_inicial_sub,
          cantidad: idSubasta.cantidad_sub,
          imagen_sub: idSubasta.imagen_sub,
          descripcion_sub: idSubasta.descripcion_sub,
          variedad: idSubasta.fk_variedad,
          nombre_fin: idSubasta.fk_finca,
          certificado_sub: idSubasta.certificado_sub || "",
        });
       
        getVariForUser(usuario.pk_cedula_user, idSubasta.fk_finca);
      } catch (error) {
        console.error("Error en el sistema:", error);
      }
    }
  }, [mode, idSubasta]);

  const handleFincaChange = (e) => {
    const selectedFincaId = e.target.value;
    const selectedFinca = fincasActivas.find(finca => finca.pk_id_fin === selectedFincaId);
    const nombre_fin = selectedFinca ? selectedFinca.nombre_fin : '';
    setFormData((prevData) => ({ ...prevData, nombre_fin, variedad: "" }));
    if (nombre_fin) {
      getVariForUser(usuario.pk_cedula_user, nombre_fin);
    }
  };

  const handleVariedadChange = (e) => {
    const selectedVariedad = e.target.value;
    setFormData((prevData) => ({ ...prevData, variedad: selectedVariedad }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // addNotification({
    //   title: "hola putitos ",
    //   message: "esta funcionando correctamente ",
    //   duration: 4000,
    //   native: true,
    //   onClick: ()=> window.location = "la url de donde quiere que lo redirija la notificacion "
   
    // })
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
      //notificaciones
      // data.append("tipo_not", formData.tipo_not);
      // data.append("texto_not", formData.texto_not);
      // data.append("fk_id_subasta", formData.tipo_not);
      // data.append("fk_id_usuario", formData.pk_cedula_user);

      if (mode === "create") {
        createSubs(data, usuario.pk_cedula_user);
       // createNots(data, usuario.pk_cedula_user);

      } else if (mode === "update") {
        updateSubs(usuario.pk_cedula_user, data, idSubasta.pk_id_sub);
      }
    } catch (error) {
      console.error("Error en el sistema: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
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
                  className="absolute -top-2 -right-2 p-2 bg-gray-300 rounded-xl"
                  onClick={() => setFormData({ ...formData, imagen_sub: "" })}
                >
                  <icono.iconoCambiar />
                </button>
                {mode === "update" && typeof formData.imagen_sub === "string" ? (
                  <img
                    src={`http://localhost:4000/img/subasta/${formData.imagen_sub}`}
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
      <div className="grid grid-cols-2 gap-x-2">
        <Input
          placeholder="Fecha de Inicio"
          isRequired
          label="Fecha de Inicio"
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
          label="Fecha final"
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
          variant="bordered"
          type="number"
          name="precioInicial"
          value={formData.precioInicial}
          onChange={handleChange}
        />
        <div className="relative flex justify-center">
          <input
            placeholder="Certificado de la subasta"
            type="file"
            name="certificado_sub"
            className="hidden"
            id="certificado_sub"
            onChange={handleChange}
          />
          <label
            htmlFor="certificado_sub"
            className="cursor-pointer items-center w-[345px] flex bg-transparent border-2 rounded-xl border-gray-200"
          >
            <div className="flex items-center h-5 transition duration-300">
              <span className="text-gray-500 w-full ml-2">
                {formData.certificado_sub ? (
                  typeof formData.certificado_sub === "string" ? (
                    formData.certificado_sub
                  ) : (
                    formData.certificado_sub.name
                  )
                ) : (
                  "Seleccionar certificado"
                )}
              </span>
            </div>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            {<icono.iconoFlor />}
          </span>
          <select
            name="nombre_fin"
            value={formData.nombre_fin}
            onChange={handleFincaChange}
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden>
              Seleccionar Finca
            </option>
            {fincasActivas.length > 0 ? (
              fincasActivas.map((finca) => (
                <option value={finca.pk_id_fin} key={finca.pk_id_fin}>
                  {finca.nombre_fin}
                </option>
              ))
            ) : (
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
            {variedadForuser.length > 0 ? (
              variedadForuser
                .filter((variedad) => variedad.estado_vari === "activo")
                .map((variedad) => (
                  <option value={variedad.pk_id_vari} key={variedad.pk_id_vari}>
                    {variedad.nombre_tipo_vari}
                  </option>
                ))
            ) : (
              <option value="" className="text-gray-600">
                Seleccionar finca.
              </option>
            )}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
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
