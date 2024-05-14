import React, { useState } from "react";
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

function VariedadUserTable({ registrar, results, actualizar, desactivar, activar, }) {
  const [filteredResults, setFilteredResults] = useState(results);
  const [searchValue, setSearchValue] = useState("");

  const handleUpdateVari = (id) => {
    localStorage.setItem("id_vari", id);
    actualizar(id);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = results.filter((variedad) =>
      variedad.nombre_vari.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(filtered);
  };

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
          onClick={registrar}
        >
          Registrar Variedad
        </Button>
      </div>
      <div className="grid grid-cols-3 justify-center items-center gap-4 p-3">
        {results.map((result, i) => (
          <Card shadow="sm" key={i}>
            <CardBody className="overflow-visible px-2 items-center">
              <b className="text-center">{result.nombre_tipo_vari}</b>
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={result.imagen_vari}
                className="w-full object-cover h-[140px]"
                src={`http://localhost:4000/variedades/${result.imagen_vari}`}
              />
            </CardBody>
            <CardFooter className="text-small flex-col justify-between">
              <p>finca: {result.nombre_fin}</p>
              <p className="text-default-500">Descripción: {result.descripcion_vari}</p>
            </CardFooter>
            <div className="flex flex-col items-center w-full gap-2 pb-3">
              <Button
                color="default"
                startContent={<EditIcon />}
                onClick={() => handleUpdateVari(result.pk_id_vari)}
              >
                Editar Variedad
              </Button>
              {result.estado_vari === "activo" ? (
                <Button
                  className="bg-red-600 text-white"
                  startContent={<DesactivarIcon />}
                  onClick={() => desactivar(result.pk_id_vari)}
                >
                  Desactivar variedad
                </Button>
              ) : (
                <Button
                  className="bg-green-600 text-white px-[27px]"
                  startContent={<ActivarIcon />}
                  onClick={() => activar(result.pk_id_vari)}
                >
                  Activar variedad
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VariedadUserTable;
