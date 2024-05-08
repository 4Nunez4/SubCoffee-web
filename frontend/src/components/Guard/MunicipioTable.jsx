import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { SearchIcon } from "../../nextui/SearchIcon";
import { PlusIcon } from "../../nextui/PlusIcon.jsx";
import { ChevronDownIcon } from "../../nextui/ChevronDownIcon";
import { EditIcon } from "../../nextui/EditIcon.jsx";
import DesactivarIcon from "../../nextui/DesactivarIcon.jsx";
import ActivarIcon from "../../nextui/ActivarIcon.jsx";

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
};

export default function MunicipioTable({ registrar, data, results, actualizar, desactivar, activar}) {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "pk_codigo_muni",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const handleUpdateUser = (id) => {
    localStorage.setItem("id_muni", id);
    actualizar(id)
  };

  const statusOptions = [
    { name: "Inactivo", uid: "inactivo" },
    { name: "Activo", uid: "activo" },
  ];

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredResults = results;

    if (hasSearchFilter) {
      filteredResults = filteredResults.filter((results) =>
          String(results.pk_codigo_muni).toLowerCase().includes(filterValue.toLowerCase()) ||
          String(results.nombre_muni).toLowerCase().includes(filterValue.toLowerCase()) ||
          String(results.nombre_depar).toLowerCase().includes(filterValue.toLowerCase()) ||
          String(results.fk_departamento).toLowerCase().includes(filterValue.toLowerCase()) ||
          String(results.estado_muni).toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if ( statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredResults = filteredResults.filter((results) =>
        Array.from(statusFilter).includes(results.estado_muni)
      );
    }

    return filteredResults;
  }, [results, filterValue, statusFilter]);

  const pages = useMemo(() => {
    if (!Array.isArray(filteredItems)) {
      return 0; // Si filteredItems no es un arreglo, retornar 0 páginas
    }
    return Math.ceil(filteredItems.length / rowsPerPage);
  }, [filteredItems, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
  
    // Verificar si filteredItems está definido y es un arreglo
    if (!Array.isArray(filteredItems)) {
      return []; // Devolver un arreglo vacío si filteredItems no es un arreglo
    }
  
    // Aplicar slice solo si filteredItems es un arreglo válido
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((results, columnKey) => {
    const cellValue = results[columnKey];

    switch (columnKey) {
      case "nombre_depar" : 
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
          <p className="text-bold text-sm capitalize text-default-400">{results.fk_departamento}</p>
        </div>
      );
      case "estado_muni":
        return (
          <Chip className="capitalize" color={statusColorMap[results.estado_muni]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Button color="default" startContent={<EditIcon />} onClick={() => handleUpdateUser(results.pk_codigo_muni)}>
              Editar
            </Button>
            {results.estado_muni === "activo" ? (
              <Button className="bg-red-600 text-white" startContent={<DesactivarIcon />} onClick={() => desactivar(results.pk_codigo_muni)}>
                Desactivar
              </Button>
            ) : (
              <Button className="bg-green-600 text-white px-[27px]" startContent={<ActivarIcon />} onClick={() => activar(results.pk_codigo_muni)}>
                Activar
              </Button>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onStatusFilter = (selectedKeys) => {
    setStatusFilter(selectedKeys);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] border rounded-xl border-grisMedio"
            placeholder="Buscar municipio..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                aria-labelledby="Acciones"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={onStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="bg-slate-400 text-white" endContent={<PlusIcon />} onClick={registrar} >
              Registrar
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {results && results.length} municipios
          </span>
          <label className="flex items-center text-default-400 text-small">
            Columnas por páginas:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center py-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[482px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={data}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Municipio no encontrado"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.pk_codigo_muni}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
