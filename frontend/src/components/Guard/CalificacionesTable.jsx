import { Avatar, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useCalificacionesContext } from "../../context/CalificacionesContext";
import FormRegisCalificacion from "../templates/FormRegisCalificacion";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function CalificacionesTable({ titleBtn, fk_user }) {
  const [abrirModalCalificacion, setAbrirModalCalificacion] = useState(false);
  const { getCalificacionesUser, calificaciones, stats = {}, setIdCalificacion } = useCalificacionesContext();
  const [mode, setMode] = useState("create");
  const userlocal = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getCalificacionesUser(fk_user);
  }, [fk_user, getCalificacionesUser]);

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        size={14}
        color={index < count ? colors.orange : colors.grey}
        className="mr-1"
      />
    ));
  };

  const renderAverageStars = (average) => {
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 !== 0;
    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar
            key={index}
            size={24}
            color={colors.orange}
            className="mr-1"
          />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt size={24} color={colors.orange} className="mr-1" />
        )}
        {Array.from(
          { length: 5 - fullStars - (hasHalfStar ? 1 : 0) },
          (_, index) => (
            <FaStar
              key={index + fullStars + 1}
              size={18}
              color={colors.grey}
              className="mr-1"
            />
          )
        )}
      </div>
    );
  };

  const handleCalif = (mode) => {
    setAbrirModalCalificacion(true);
    setMode(mode);
  };

  const renderProgressBar = (count, total) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div className="flex items-center w-full">
        <div className="flex items-center mr-2">
          <FaStar size={18} color={colors.orange} className="mr-1" />
          <span>{count}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-orange-500 h-3 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center px-4 pb-4">
      <div className="w-full flex items-center gap-x-2 -mt-5">
        {stats.promedio == null || isNaN(stats.promedio) ? (
          <div className="flex w-full justify-center">
            <p className="pl-4 text-xl my-2 text-gray-400 font-semibold">Usuario sin calificaciones.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-start">
              <div className="text-7xl font-bold">
                {parseFloat(stats.promedio).toFixed(1)}
              </div>
              {renderAverageStars(stats.promedio)}
              <div>{stats.total}</div>
            </div>
            <div className="flex flex-col mt-4 w-full">
              {renderProgressBar(stats.cinco_estrellas, stats.total)}
              {renderProgressBar(stats.cuatro_estrellas, stats.total)}
              {renderProgressBar(stats.tres_estrellas, stats.total)}
              {renderProgressBar(stats.dos_estrellas, stats.total)}
              {renderProgressBar(stats.una_estrella, stats.total)}
            </div>
          </>
        )}
      </div>
      {calificaciones && calificaciones.some((calificacion) => calificacion.id_usuario_cali === userlocal.pk_cedula_user) || fk_user === userlocal.pk_cedula_user || userlocal.rol_user === "admin" ? (
        ""
      ) : (
        <Button className="mt-2" onClick={() => handleCalif("create")}>
          Registrar calificación
        </Button>
      )}
      <FormRegisCalificacion
        open={abrirModalCalificacion}
        onClose={() => setAbrirModalCalificacion(false)}
        fk_user={fk_user}
        mode={mode}
        title={"Calificar"}
        titleBtn={titleBtn}
      />
      <div className="mt-4 w-full">
        {stats?.promedio == null || isNaN(stats.promedio) || stats.length === 0 ? (
          ""
        ) : (
          calificaciones.map((calificacion) => (
            <div key={calificacion.pk_id_cali} className="shadow-small p-2 rounded-xl mb-2">
              <div className="flex gap-x-2 justify-between">
                <div className="flex items-center gap-x-2">
                  <Avatar
                    alt={calificacion.nombre_user}
                    className="flex-shrink-0"
                    size="sm"
                    src={
                      calificacion.imagen_user &&
                      calificacion.imagen_user.length > 0
                        ? `http://localhost:4000/usuarios/${calificacion.imagen_user}`
                        : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
                    }
                  />
                  <div className="flex flex-col">
                    <span className="">{calificacion.nombre_user}</span>
                    <div className="flex items-center text-sm gap-x-1">
                      <div className="flex">
                        {renderStars(calificacion.estrellas_cali)}
                      </div>
                      <p className="text-xs"> {new Date(calificacion.fecha_cali).toLocaleDateString()} </p>
                    </div>
                  </div>
                </div>
                <div>
                  {calificacion.id_usuario_cali === userlocal.pk_cedula_user && (
                    <Button className="bg-[#e0e0e0] text-[#009100]" onClick={() => { handleCalif("update"); setIdCalificacion(calificacion); }}>
                      Editar
                    </Button>
                  )}
                </div>
              </div>
              <p>{calificacion.opiniones_cali}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalificacionesTable;
