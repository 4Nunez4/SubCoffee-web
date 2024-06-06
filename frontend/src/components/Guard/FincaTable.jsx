import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

import { useFincaContext } from "../../context/FincaContext.jsx";
import { EditIcon } from "../../nextui/EditIcon";
import ActivarIcon from "../../nextui/ActivarIcon";
import DesactivarIcon from "../../nextui/DesactivarIcon";
import { PlusIcon } from "../../nextui/PlusIcon";
import FormFinca from "../templates/FormFinca";
import FormVariedadUser from "../templates/FormVariedadUser.jsx";

function FincaTable() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { getFincaUser, fincas, desactivarFincas, activarFincas, setIdFinca } = useFincaContext();

  const [abrirModalFinca, setAbrirModalFinca] = useState(false);
  const [abrirModalVariedad, setAbrirModalVariedad] = useState(false);
  const [mode, setMode] = useState("create");
  const [pkFinca, setPkFinca] = useState(0);

  useEffect(() => {
    getFincaUser(user.pk_cedula_user);
  }, [user.pk_cedula_user, getFincaUser]);

  const handleToggleFinca = (mode) => {
    setAbrirModalFinca(true);
    setMode(mode);
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between py-4 gap-x-3 px-12 items-center">
        <p className="text-center"> Tu finca tiene una historia que contar </p>
        <Button
          className="bg-slate-400 text-white"
          endContent={<PlusIcon />}
          onClick={() => handleToggleFinca("create")}
        >
          Registrar finca
        </Button>
      </div>
      <div>
        <FormFinca
          open={abrirModalFinca}
          onClose={() => setAbrirModalFinca(false)}
          title={mode === "create" ? "Registrar Finca" : "Actualizar Finca"}
          titleBtn={mode === "create" ? "Registrar" : "Actualizar"}
          mode={mode}
        />
        <FormVariedadUser
          open={abrirModalVariedad}
          title={"Variedades"}
          onClose={() => setAbrirModalVariedad(false)}
          titleBtn={"Registrar Variedad"}
          pkFinca={pkFinca}
        />
      </div>
      <div className="flex">
        {fincas ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-8">
            {fincas.map((result) => (
              <Card key={result.pk_id_fin} className="py-4 w-80">
                <CardHeader className="pb-0 px-8 flex-col items-start">
                  <div className="flex justify-between items-center gap-x-2">
                    <p className="uppercase font-bold text-xl">
                      {result.nombre_fin}
                    </p>
                    <p
                      className={`rounded-lg px-2 text-white ${
                        result.estado_fin === "activo"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-center`}
                    >
                      {result.estado_fin === "activo" ? "Activa" : "Inactiva"}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-xs gap-x-4 text-gray-500">
                      {result.nombre_depar} - {result.nombre_muni} -{" "}
                      {result.nombre_vere}
                    </p>
                  </div>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex items-center">
                  <Image
                    alt={result.imagen_fin}
                    shadow="sm"
                    radius="md"
                    width="100%"
                    className="rounded-xl w-60 h-[170px]"
                    src={`http://localhost:4000/fincas/${result.imagen_fin}`}
                  />
                </CardBody>
                <div className="flex justify-center items-center gap-2 flex-col px-10">
                  <Button className="w-full flex" onPress={() => {setAbrirModalVariedad(true); setPkFinca(result.pk_id_fin)}}>
                    Ver variedades de la finca
                  </Button>
                  <Button
                    color="default"
                    className="w-full"
                    startContent={<EditIcon />}
                    onClick={() => {
                      handleToggleFinca("update");
                      setIdFinca(result);
                    }}
                  >
                    Editar finca
                  </Button>
                  {result.estado_fin === "activo" ? (
                    <Button
                      className="bg-red-600 text-white w-full"
                      startContent={<DesactivarIcon />}
                      onClick={() => {
                        desactivarFincas(result.pk_id_fin, user.pk_cedula_user);
                      }}
                    >
                      Desactivar finca
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 text-white px-[27px] w-full mx-4"
                      startContent={<ActivarIcon />}
                      onClick={() => {
                        activarFincas(result.pk_id_fin, user.pk_cedula_user);
                      }}
                    >
                      Activar finca
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default FincaTable;
