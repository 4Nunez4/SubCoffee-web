import React, { useState, useEffect } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { useCalificacionesContext } from "../../context/CalificacionesContext";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function RegisterCalificacion({ titleBtn, fk_user, mode }) {
  const [formData, setFormData] = useState({
    estrellas: 0,
    opiniones: "",
  });

  const userlocal = JSON.parse(localStorage.getItem("user"));
  const { createCalificacion, updateCalificacion, getCalificacionesUser, idCalificacion } = useCalificacionesContext();

  useEffect(() => {
    if (mode === "update" && idCalificacion) {
      setFormData({
        estrellas: idCalificacion.estrellas_cali || 0,
        opiniones: idCalificacion.opiniones_cali || ""
      });
    }
  }, [mode, idCalificacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "opiniones" && value.length > 100) {
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClick = (value) => {
    setFormData({
      ...formData,
      estrellas: value
    });
  };

  const handleSubmit = async () => {
    const data = {
      idUsuario: userlocal.pk_cedula_user,
      estrellas: formData.estrellas,
      opiniones: formData.opiniones,
      fk_usuario: fk_user,
    };

    try {
      if (mode === "update" && idCalificacion) {
        await updateCalificacion(idCalificacion.pk_id_cali, data);
      } else {
        await createCalificacion(data);
      }
      setFormData({
        estrellas: 0,
        opiniones: ""
      });
      getCalificacionesUser(fk_user);
    } catch (error) {
      alert("Error en el servidor: " + error.message);
    }
  };

  const stars = Array(5).fill(0);
  const { estrellas, opiniones } = formData;

  return (
    <div className="flex flex-col items-center pb-3">
      <div className="flex mb-4 -mt-3">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            color={
              (estrellas > index) ? colors.orange : colors.grey
            }
            className="mr-2 cursor-pointer"
          />
        ))}
        <p className="text-lg font-semibold text-gray-700">
          {estrellas > 0 ? `${estrellas}` : ""}
        </p>
      </div>
      <Textarea
        label="Opinión"
        max={5}
        minLength={10}
        variant="bordered"
        placeholder="Escribe tu opinión"
        className="max-w-96 mb-4"
        name="opiniones"
        value={opiniones}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>{titleBtn}</Button>
    </div>
  );
}

export default RegisterCalificacion;
