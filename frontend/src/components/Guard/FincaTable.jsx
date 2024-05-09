import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { EditIcon } from "../../nextui/EditIcon";
import ActivarIcon from "../../nextui/ActivarIcon";
import DesactivarIcon from "../../nextui/DesactivarIcon";
import { PlusIcon } from "../../nextui/PlusIcon";
import { SearchIcon } from "../../nextui/SearchIcon";

function FincaTable({ registrar, results, actualizar, desactivar, activar }) {
  const handleUpdateFinca = (id) => {
    localStorage.setItem("id_fin", id);
    actualizar(id);
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredResultss, setFilteredResults] = useState(results);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (!value) {
      setFilteredResults(results);
      return;
    }
    const filteredResults = results.reduce((filtered, finca) => {
      const fincaNameLowerCase = finca.nombre_fin.toLowerCase();
      const searchValueLowerCase = value.toLowerCase();

      if (fincaNameLowerCase.includes(searchValueLowerCase)) {
        filtered.push(finca);
      }
      return filtered;
    }, []);

    setFilteredResults(filteredResults);
  };

  const filteredResults = results.filter((finca) =>
    finca.nombre_fin.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex py-4 gap-x-3 items-center">
        <Autocomplete
          value={searchValue}
          onChange={(value) => handleSearch(value)}
          defaultItems={results}
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
          placeholder="Buscar finca"
          popoverProps={{
            offset: 10,
            classNames: {
              base: "rounded-large",
              content: "p-1 border-small border-default-100 bg-background",
            },
            wrapper: "w-full", // Esta línea ajusta el ancho del popover para que sea igual al ancho del Autocomplete
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
          {(finca) => (
            <AutocompleteItem
              key={finca.pk_id_fin}
              textValue={finca.nombre_fin}
            >
              <div className="flex justify-between items-center">
                <p className="text-small">{finca.nombre_fin}</p>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Button
          className="bg-slate-400 text-white"
          endContent={<PlusIcon />}
          onClick={registrar}
        >
          Registrar finca
        </Button>
      </div>
      <div className="flex justify-center items-center px-12">
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredResults.map((result) => (
              <Card key={result.pk_id_fin} className="py-4">
                <CardHeader className="pb-0 px-8 flex-col items-start">
                  <div className="flex justify-between gap-x-2">
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
                  <h4 className="text-tiny">{result.descripcion_fin}</h4>
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
                    className="rounded-xl w-80 h-[180px]"
                    src={`http://localhost:4000/public/fincas/${result.imagen_fin}`}
                  />
                </CardBody>
                <div className="relative flex justify-center items-center gap-2">
                  <Button
                    color="default"
                    startContent={<EditIcon />}
                    onClick={() => handleUpdateFinca(result.pk_id_fin)}
                  >
                    Editar finca
                  </Button>
                  {result.estado_fin === "activo" ? (
                    <Button
                      className="bg-red-600 text-white"
                      startContent={<DesactivarIcon />}
                      onClick={() => desactivar(result.pk_id_fin)}
                    >
                      Desactivar finca
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 text-white px-[27px]"
                      startContent={<ActivarIcon />}
                      onClick={() => activar(result.pk_id_fin)}
                    >
                      Activar finca
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

export default FincaTable;
