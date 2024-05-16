import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";

import { PlusIcon } from "../../nextui/PlusIcon";
import DesactivarIcon from "../../nextui/DesactivarIcon";
import ActivarIcon from "../../nextui/ActivarIcon";
import { EditIcon } from "../../nextui/EditIcon";
import { SearchIcon } from "../../nextui/SearchIcon";
import VariedadUserContext from "../../context/VariedadUserContext";
import FormVariedadUser from "../templates/FormVariedadUser";

function VariedadUserTable() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { getVariForUser, setIdVariedad, variedadForuser, activarVaris, desactivarVaris } = useContext(VariedadUserContext);

  const [abrirModal, setAbrirModal] = useState(false);
  const [mode, setMode] = useState("create");

  useEffect(() => {
    getVariForUser(user.pk_cedula_user);
  }, []);

  const handleToggle = (mode) => {
    setAbrirModal(true);
    setMode(mode);
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredResultss, setFilteredResults] = useState(variedadForuser);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (!value) {
      setFilteredResults(variedadForuser);
      return;
    }
    const filteredResults = variedadForuser.reduce((filtered, variedad) => {
      const fincaNameLowerCase = variedad.nombre_tipo_vari.toLowerCase();
      const searchValueLowerCase = value.toLowerCase();

      if (fincaNameLowerCase.includes(searchValueLowerCase)) {
        filtered.push(variedad);
      }
      return filtered;
    }, []);

    setFilteredResults(filteredResults);
  };

  const filteredResults = variedadForuser.filter((variedad) =>
    variedad.nombre_tipo_vari.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex py-4 gap-x-3 items-center">
        <Autocomplete
          value={searchValue}
          onChange={(value) => handleSearch(value)}
          defaultItems={variedadForuser}
          inputProps={{
            classNames: {
              input: "ml-1",
              inputWrapper: "h-[48px]",
            },
          }}
          listboxProps={{
            hideSelectedIcon: true,
            itemClasses: {
              base: [
                "rounded-medium",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "dark:data-[hover=true]:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[hover=true]:bg-default-200",
                "data-[selectable=true]:focus:bg-default-100",
                "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          aria-label="Select a farm"
          placeholder="Buscar Variedad"
          popoverProps={{
            offset: 10,
            classNames: {
              base: "rounded-large",
              content: "p-1 border-small border-default-100 bg-background",
            },
          }}
          startContent={
            <SearchIcon
              className="text-default-400"
              strokeWidth={2.5}
              size={20}
            />
          }
          radius="full"
          variant="bordered"
        >
          {(variedad) => (
            <AutocompleteItem
              key={variedad.pk_id_vari}
              textValue={variedad.nombre_tipo_vari}
            >
              <div className="flex justify-between items-center">
                <p className="text-small">{variedad.nombre_tipo_vari}</p>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
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
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {variedadForuser.map((variedad, i) => (
              <Card shadow="sm" key={i} className="py-4">
                <CardBody className="overflow-visible px-2 items-center">
                  <b className="text-center">{variedad.nombre_tipo_vari}</b>
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={variedad.imagen_vari}
                    className="w-full object-cover h-[140px]"
                    src={`http://localhost:4000/variedades/${variedad.imagen_vari}`}
                  />
                </CardBody>
                <CardFooter className="text-small flex-col justify-between">
                  <p>finca: {variedad.nombre_fin}</p>
                  <p className="text-default-500">
                    Descripción: {variedad.descripcion_vari}
                  </p>
                </CardFooter>
                <div className="flex justify-center items-center gap-2 flex-col px-10">
                  <Button
                    color="default"
                    className="w-full"
                    startContent={<EditIcon />}
                    onClick={() => {handleToggle("update"); setIdVariedad(variedad);}}
                  >
                    Editar Variedad
                  </Button>
                  {variedad.estado_vari === "activo" ? (
                    <Button
                      className="bg-red-600 text-white w-full"
                      startContent={<DesactivarIcon />}
                      onClick={() => {desactivarVaris(variedad.pk_id_vari, user.pk_cedula_user)}}
                    >
                      Desactivar variedad
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 text-white px-[27px] w-full"
                      startContent={<ActivarIcon />}
                      onClick={() => {activarVaris(variedad.pk_id_vari, user.pk_cedula_user)}}
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
