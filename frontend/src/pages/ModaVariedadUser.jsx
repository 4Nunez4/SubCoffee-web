import React, { useEffect, useState } from "react";
import { ModalFooter, Button } from "@nextui-org/react";

import { useTipoVariContext } from "../context/TipoVariContext";
import { useVariedadUserContext } from "../context/VariedadUserContext";

import { icono } from "../components/atoms/IconsAtom";
import DesactivarIcon from "../nextui/DesactivarIcon";
import ActivarIcon from "../nextui/ActivarIcon";

export default function ModaVariedadUser({ titleBtn, pkFinca }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { getTipoVariedades, tipoVariedades } = useTipoVariContext();
  const { getVariForUser, createVaris, variedadForuser, activarVaris, desactivarVaris } = useVariedadUserContext();
  const [formData, setFormData] = useState({
    fk_tipo_variedad: "",
  });

  useEffect(() => {
    getTipoVariedades();
  }, []);

  useEffect(() => {
    if (user.pk_cedula_user && pkFinca) {
      getVariForUser(user.pk_cedula_user, pkFinca);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        fk_finca: pkFinca,
        fk_tipo_variedad: formData.fk_tipo_variedad,
      };
      await createVaris(data, user.pk_cedula_user, pkFinca);
      setFormData({ fk_tipo_variedad: "" });
    } catch (error) {
      console.error("Error del sistema:", error);
    }
  };

  return (
    <>
      <div className="overflow-y-auto max-h-64 px-4">
        {variedadForuser ? (
          variedadForuser.map((varis, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-md p-4 mx-3 flex mb-2 items-center justify-between shadow-md"
            >
              <p className="text-gray-800 font-semibold">{varis.nombre_tipo_vari}</p>
              <p
                className={`rounded-lg px-2 text-white ${
                  varis.estado_vari === "activo" ? "bg-green-500" : "bg-red-500"
                } text-center`}
              >
                {varis.estado_vari === "activo" ? "Activa" : "Inactiva"}
              </p>
              {varis.estado_vari === "activo" ? (
                <Button
                  className="bg-red-600 text-white w-44"
                  startContent={<DesactivarIcon />}
                  onClick={() => desactivarVaris(varis.pk_id_vari, user.pk_cedula_user, pkFinca)}
                >
                  Desactivar Variedad
                </Button>
              ) : (
                <Button
                  className="bg-green-600 text-white w-44"
                  startContent={<ActivarIcon />}
                  onClick={() => activarVaris(varis.pk_id_vari, user.pk_cedula_user, pkFinca)}
                >
                  Activar Variedad
                </Button>
              )}
            </div>
          ))
        ) : (
          ""
        )}
      </div>
      <form onSubmit={onSubmit} className="space-y-4 px-4">
        <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          <icono.iconoDepar />
        </span>
          <select
            name="fk_tipo_variedad"
            value={formData.fk_tipo_variedad}
            onChange={(e) => setFormData({ ...formData, fk_tipo_variedad: e.target.value })}
            required
            className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" hidden className="text-gray-400">
              Seleccionar Variedad
            </option>
            {tipoVariedades.map((variedad) => (
              <option
                key={variedad.pk_id_tipo_vari}
                value={variedad.pk_id_tipo_vari}
              >
                {variedad.nombre_tipo_vari}
              </option>
            ))}
          </select>
        </div>
        <ModalFooter className="flex justify-center">
          <Button type="submit" className="bg-gray-600 text-white">
            {titleBtn}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}
