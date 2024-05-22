import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

import { PlusIcon } from "../../nextui/PlusIcon";
import DesactivarIcon from "../../nextui/DesactivarIcon";
import ActivarIcon from "../../nextui/ActivarIcon";
import { EditIcon } from "../../nextui/EditIcon";
import VariedadUserContext from "../../context/VariedadUserContext";
import FormVariedadUser from "../templates/FormVariedadUser";

function VariedadUserTable() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { getVariForUser, setIdVariedad, variedadForuser, activarVaris, desactivarVaris } = useContext(VariedadUserContext);

  const [abrirModal, setAbrirModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [pkFinca, setPkFinca] = useState(null);

  useEffect(() => {
    if (user.pk_cedula_user && pkFinca) {
      getVariForUser(user.pk_cedula_user, pkFinca);
    }
  }, [user.pk_cedula_user, pkFinca]);

  const handleToggle = (mode) => {
    setAbrirModal(true);
    setMode(mode);
  };

  const handleVariedadClick = (variedad) => {
    setPkFinca(variedad.pk_id_finca);
    setIdVariedad(variedad);
  };

  return (
    <div className="w-full">
      <div className="flex py-4 gap-x-3 items-center">
        <Button
          className="bg-slate-400 text-white"
          endContent={<PlusIcon />}
          onClick={() => handleToggle("create")}
        >
          Registrar Variedad
        </Button>
      </div>
      <FormVariedadUser
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        title={mode === "create" ? "Registrar Variedad" : "Actualizar Variedad"}
        titleBtn={mode === "create" ? "Registrar" : "Actualizar"}
        mode={mode}
      />
      <div className="flex justify-center items-center px-12">
        {variedadForuser.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {variedadForuser.map((variedad, i) => (
              <Card shadow="sm" key={i} className="py-4">
                <CardBody className="overflow-visible px-2 items-center">
                  <b className="text-center">{variedad.nombre_tipo_vari}</b>
                </CardBody>
                <CardFooter className="text-small flex-col justify-between">
                  <p>Finca: {variedad.nombre_fin}</p>
                </CardFooter>
                <div className="flex justify-center items-center gap-2 flex-col px-10">
                  <Button
                    color="default"
                    className="w-full"
                    startContent={<EditIcon />}
                    onClick={() => handleVariedadClick(variedad)}
                  >
                    Editar Variedad
                  </Button>
                  {variedad.estado_vari === "activo" ? (
                    <Button
                      className="bg-red-600 text-white w-full"
                      startContent={<DesactivarIcon />}
                      onClick={() => desactivarVaris(variedad.pk_id_vari, user.pk_cedula_user)}
                    >
                      Desactivar variedad
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 text-white px-[27px] w-full"
                      startContent={<ActivarIcon />}
                      onClick={() => activarVaris(variedad.pk_id_vari, user.pk_cedula_user)}
                    >
                      Activar variedad
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-red-400 rounded-lg text-center p-4">
            <p className="text-white">No se encontraron fincas</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VariedadUserTable;
