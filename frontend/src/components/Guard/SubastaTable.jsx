import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Autocomplete,
  Image,
  AutocompleteItem,
} from "@nextui-org/react";
import { SearchIcon } from "../../nextui/SearchIcon";
import { PlusIcon } from "../../nextui/PlusIcon";
import { EditIcon } from "../../nextui/EditIcon";

export default function SubastaTable({
  registrar,
  results,
  actualizar,
  desactivar,
  activar,
}) {
  const [filteredResults, setFilteredResults] = useState(results);
  const [searchValue, setSearchValue] = useState("");
  const usuario = JSON.parse(localStorage.getItem("user"));

  const handleUpdateSubasta = (id) => {
    localStorage.setItem("id_sub", id);
    actualizar(id);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = results.filter((subasta) =>
      subasta.nombre_tipo_vari.toLowerCase().includes(value.toLowerCase())
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
          placeholder="Buscar Subasta"
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
          {(subasta) => (
            <AutocompleteItem
              key={subasta.pk_id_sub}
              textValue={subasta.nombre_tipo_vari}
            >
              <div className="flex justify-between items-center">
                <p className="text-small">{subasta.nombre_tipo_vari}</p>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Button
          className="bg-slate-400 text-white"
          endContent={<PlusIcon />}
          onClick={registrar}
        >
          Registrar Subasta
        </Button>
      </div>
      <div className="grid grid-cols-2 justify-center items-center gap-4 p-3">
        {results.map((subasta) => (
          <Card key={subasta.pk_id_sub} className="max-w-[500px] p-2">
            <CardHeader className="justify-between">
              <div className="flex gap-3">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={subasta.imagen_user}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {subasta.nombre_user}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    @{subasta.email_user}
                  </h5>
                </div>
              </div>
              <Button
                className="bg-gray-100 text-foreground border-default-200"
                radius="md"
                variant="bordered"
                size="sm"
                onPress={() => handleUpdateSubasta(subasta.pk_id_sub)}
              >
                Visualizar perfil
              </Button>
            </CardHeader>
            <CardBody className=" items-start">
              <span className="w-full text-center">
                <b className="text-lg">
                  {subasta.nombre_tipo_vari}-{subasta.nombre_fin}
                </b>
                <p className="text-sm text-default-400">{subasta.estado_sub}</p>
              </span>
              <CardBody className="flex items-center">
                <Image
                  shadow="sm"
                  radius="md"
                  alt={subasta.imagen_sub}
                  className="w-[380px] object-cover h-[200px]"
                  src={subasta.imagen_sub}
                />
                <div className="flex flex-col gap-1 pt-4">
                  <div className="text-gray-400 text-sm flex justify-between">
                    <p>
                      Cantidad: {subasta.cantidad_sub} -{" "}
                      {subasta.unidad_peso_sub}
                    </p>
                    <p>Precio inicial: {subasta.precio_inicial_sub}</p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-400 text-sm">
                      {"Fecha de inicio "}
                      {new Date(subasta.fecha_inicio_sub).toLocaleString(
                        "es-ES",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {" Fecha fin "}
                      {new Date(subasta.fecha_fin_sub).toLocaleString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {subasta.nombre_vere} - {subasta.nombre_muni} - {subasta.nombre_depar}
                    </p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-center gap-x-4">
                <Button
                  className="bg-gray-400"
                  radius="md"
                  size="lg"
                  onPress={() => handleUpdateSubasta(subasta.pk_id_sub)}
                >
                  Visualizar Subasta
                </Button>
                {subasta.pk_cedula_user === usuario.pk_cedula_user && (
                  <Button
                    className="bg-gray-400"
                    radius="md"
                    size="lg"
                    startContent={<EditIcon />}
                    onPress={() => handleUpdateSubasta(subasta.pk_id_sub)}
                  >
                    Editar Subasta
                  </Button>
                )}
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
