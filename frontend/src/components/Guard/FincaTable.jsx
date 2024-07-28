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
  }, []);

  const handleToggleFinca = (mode) => {
    setAbrirModalFinca(true);
    setMode(mode);
  };
  
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 py-4 gap-3 px-4 items-center">
        <p className="text-center font-bold text-lg">Tu finca tiene una historia que contar</p>
        <Button
          className="bg-[#39A800] text-white mx-auto"
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
      <div className="flex justify-center items-center">
        {fincas ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-4 gap-y-3">
            {fincas.map((result) => (
              <Card key={result.pk_id_fin} className="py-4 max-w-80 mx-auto border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-0 px-4 flex-col items-start">
                  <div className="flex justify-between items-center gap-4">
                    <p className="font-bold text-xl">{result.nombre_fin}</p>
                    <p
                      className={`rounded-lg py-1 ${
                        result.estado_fin === "activo"
                          ? "bg-[#d1f4e0] text-[#14a150] px-[10px]"
                          : "bg-[#fdd0df] text-[#f31263] px-[4px]"
                      }`}
                    >
                      {result.estado_fin === "activo" ? "Activa" : "Inactiva"}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-xs text-gray-500">
                      {result.nombre_depar} - {result.nombre_muni} - {result.nombre_vere}
                    </p>
                  </div>
                </CardHeader>
                <CardBody className="py-2 flex justify-center items-center">
                  <Image
                    alt={result.imagen_fin}
                    shadow="sm"
                    radius="lg"
                    className="rounded-xl w-56 h-48 object-cover"
                    src={`http://localhost:4000/fincas/${result.imagen_fin}`}
                  />
                </CardBody>
                <div className="flex justify-center items-center gap-2 flex-col px-4">
                  <Button
                    className="w-full"
                    onPress={() => {setAbrirModalVariedad(true); setPkFinca(result)}}
                  >
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
                      className="bg-[#39A800] text-white w-full"
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
          <div className="flex">
            <p className="pl-4 text-xl my-2 text-gray-400 font-semibold">No tienes ninguna finca creada.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FincaTable;
