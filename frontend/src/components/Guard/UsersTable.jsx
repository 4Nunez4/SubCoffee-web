import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  User,
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
import ActivarIcon from "../../nextui/ActivarIcon.jsx";
import DesactivarIcon from "../../nextui/DesactivarIcon.jsx";
import FormUser from "../templates/FormUser.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
};

export default function UsersTable() {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "nombre_user",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const { getUsers, users, updateUserActive, updateUserDesactive, setIdUser } = useAuthContext()

  const [abrirModal, setAbrirModal] = useState(false);
  const [mode, setMode] = useState("create");

  useEffect(() => {
    getUsers();
  }, []);
  
  const data = [
    { uid: "nombre_user", name: "Usuario", sortable: true },
    { uid: "pk_cedula_user", name: "Cedula", sortable: true },
    // { uid: "descripcion_user", name: "Descripción", sortable: true },
    { uid: "telefono_user", name: "Telefono", sortable: true },
    { uid: "rol_user", name: "Rol", sortable: true },
    { uid: "estado_user", name: "Estado", sortable: true },
    { uid: "actions", name: "Acciones", sortable: false },
  ];

  const handleToggle = (mode) => {
    setAbrirModal(true);
    setMode(mode);
  };

  const statusOptions = [
    { name: "Inactivo", uid: "inactivo" },
    { name: "Activo", uid: "activo" },
  ];

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredResults = users;

    if (hasSearchFilter) {
      filteredResults = filteredResults.filter((users) =>
        String(users.pk_cedula_user).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(users.fecha_nacimiento_user).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(users.nombre_user).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(users.rol_user).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(users.telefono_user).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(users.email_user).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(users.estado_user).toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredResults = filteredResults.filter((users) =>
        Array.from(statusFilter).includes(users.estado_user)
      );
    }

    return filteredResults;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (!Array.isArray(filteredItems)) {
      return []; // Devolver un arreglo vacío si filteredItems no es un arreglo
    }

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

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nombre_user":
        return (
          <User
            avatarProps={{ radius: "full",                       
            src: `${
              user.imagen_user && user.imagen_user.length > 0
                ? `http://localhost:4000/img/${user.imagen_user}`
                : "http://localhost:4000/usuarios/imagen_de_usuario.webp"}`, 
            }}
            description={user.email_user}
            name={cellValue}
          >
            {user.email_user}
          </User>
        );
      case "descripcion_user":
        return (
          <>
            {user.descripcion_user && user.descripcion_user.length > 0 ? (
              <span>{user.descripcion_user}</span>
            ) : (
              <span className="text-rojo">No tiene descripción</span>
            )}
          </>
        );
      case "estado_user":
        return (
          <Chip className="capitalize" color={statusColorMap[user.estado_user]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2 ">
            <Button color="default" startContent={<EditIcon />} onClick={() => {handleToggle('update'); setIdUser(user)}} className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#00ed64] hover:text-[#001e2b]">
              Editar
            </Button>
            {user.estado_user === "activo" ? (
              <Button className="bg-red-600 text-white" startContent={<DesactivarIcon />} onClick={() => updateUserDesactive(user.pk_cedula_user)}>
                Desactivar
              </Button>
            ) : (
              <Button className="bg-green-600 text-white px-[27px]" startContent={<ActivarIcon />} onClick={() => updateUserActive(user.pk_cedula_user)}>
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
      <div className="flex flex-col gap-4 px-10 pt-10">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full border rounded-xl border-grisMedio"
            placeholder="Buscar usuario..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" className="border-[#00ed64] inline-flex items-center justify-center py-2 px-4 bg-[#00ed64]">
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
            <Button className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#00ed64] hover:text-[#001e2b] " endContent={<PlusIcon />} onClick={() => handleToggle("create")} >
              Registrar
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg text-[#00684a] font-bold">
            Total {users && users.length} usuarios
          </span>
          <label className="flex items-center  text-lg text-[#00684a] font-bold">
            Columnas por páginas:
            <select
              className="bg-transparent outline-none text-lg text-[#00684a] font-bold"
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
      <div className="py-2 px-2 flex justify-between items-center m-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="success"
          page={page}
          total={pages}
          onChange={setPage}
       
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage} className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#00ed64] hover:text-[#001e2b]">
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage} className="border-[#00ed64] inline-flex items-center justify-center py-2 px-4 bg-[#00ed64] text-white  font-semibold rounded-md hover:bg-[#00ed64] border-2 hover:border-[#001e2b]  hover:text-[#001e2b] transition-all ease-in-out duration-500">
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <div className=" w-full bg-gray-300">
          <div className="mx-20 text-white">
      <FormUser
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        title={mode === 'create' ? 'Registrar Usuario' : 'Actualizar Usuario'}
        titleBtn={mode === "create" ? "Registrar" : "Actualizar"}
        mode={mode}
      />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[482px] bg-[#00684a] ",
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
              className="bg-[#001e2b] text-white text-sm text-center"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Usuario no encontrado"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.pk_cedula_user}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>

  );
}
