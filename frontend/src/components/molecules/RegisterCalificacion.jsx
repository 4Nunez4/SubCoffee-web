import React, { useState, useEffect } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { useCalificacionesContext } from "../../context/CalificacionesContext";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function RegisterCalificacion({ titleBtn, fk_user, mode }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [comentario, setComentario] = useState("");
  const userlocal = JSON.parse(localStorage.getItem("user"));
  const [hoverValue, setHoverValue] = useState(undefined);
  const { createCalificacion, updateCalificacion, getCalificacionesUser, idCalificacion } = useCalificacionesContext();
  const stars = Array(5).fill(0);

  useEffect(() => {
    if (mode === "update" && idCalificacion) {
      setComentario(idCalificacion.opiniones_cali);
    }
  }, [mode, idCalificacion]);
  

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async () => {
    const data = {
      idUsuario: userlocal.pk_cedula_user,
      estrellas: currentValue,
      opiniones: comentario,
      fk_usuario: fk_user,
    };

    try {
      if (mode === "update" && idCalificacion) {
        await updateCalificacion(idCalificacion.pk_id_cali, data);
      } else {
        await createCalificacion(data);
      }
      setCurrentValue(0);
      setComentario("");
      getCalificacionesUser(fk_user);
    } catch (error) {
      alert("Error en el servidor: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pb-3">
      <div className="flex mb-4 -mt-3">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.grey
            }
            className="mr-2 cursor-pointer"
          />
        ))}
        <p className="text-lg font-semibold text-gray-700">
          {currentValue > 0 ? `${currentValue}` : ""}
        </p>
      </div>
      <Textarea
        label="Opinión"
        variant="bordered"
        placeholder="Escribe tu opinión"
        className="max-w-96 mb-4"
        value={comentario || ""}
        onChange={(e) => setComentario(e.target.value)}
      />
      <Button onClick={handleSubmit}>{titleBtn}</Button>
    </div>
  );
}

export default RegisterCalificacion;
