import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../nextui/SearchIcon.jsx";
import NotificacionContext from "../context/NotificacionesContext.jsx";
import ModalSubCoffee from "../components/templates/ModalSubCoffee.jsx";
import { useSubastaContext } from "../context/SubastaContext.jsx";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiEyeLine } from "react-icons/ri";

 export default function ListarNotificaciones() {
//   const clickNot = ()=>{
//     addNotification({
//       title: "para  todos los usuarios",
//       message: "esta funcionando correctamente ",
//       icon: logo,
//       duration: 40000,
//       native: true,
//      onClick: ()=> window.location = "la url de donde quiere que lo redirija la notificacion "
   
//     })
//   }
// revisar las notificaciones y aplicar esos cambios al crer una subasta 
// mport React from 'react';

// function InsertNotificationButton() {
//     const handleClick = async () => {
//         const notificationType = 'oferta'; // Cambia esto según lo que necesites
//         const notificationText = 'Texto de la notificación';
//         const subastaId = 123; // Ejemplo de ID de subasta
//         const userId = 456; // Ejemplo de ID de usuario

//         try {
//             const response = await fetch('http://localhost:3000/insertNotification', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     tipo_not: notificationType,
//                     texto_not: notificationText,
//                     fk_id_subasta: subastaId,
//                     fk_id_usuario: userId
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Error al insertar notificación');
//             }

//             const result = await response.json();
//             alert(result.message); // Mostrar mensaje de éxito
//         } catch (error) {
//             console.error(error);
//             alert('Hubo un error al intentar insertar la notificación.');
//         }
//     };

//     return (
//         <button onClick={handleClick}>Insertar Notificación</button>
//     );
// }

// export default InsertNotificationButton;
//--------------------------------------------------------------------

  const navigate = useNavigate()
  const { getSubs, subastas, setIdSubasta } = useSubastaContext();
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "fecha_not",
    direction: "descending",
  });
  const [page, setPage] = useState(1);

  const [abrirModal, setAbrirModal] = useState(false)

  const handdleModaSub = (id) => {
    setAbrirModal(true)
    setIdSubasta(id)
  }

  const { getNots, Notificaciones } = useContext(NotificacionContext);

  useEffect(() => {
    getSubs()
  }, [])

  useEffect(() => {
    getNots().then((data) => {
      (data);
    });
  }, []);

  const data = [
    { uid: "fk_id_subasta", name: "Sala", sortable: true },
    { uid: "nombre_user", name: "Usuario", sortable: true },
    { uid: "tipo_not", name: "Tipo", sortable: true },
    { uid: "fecha_not", name: "Fecha", sortable: true },
    { uid: "texto_not", name: "Mensaje", sortable: true },
    { uid: "actions", name: "Acciones", sortable: false }, // Agregar esta línea
  ];
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredResults = Notificaciones;

    if (hasSearchFilter) {
      filteredResults = filteredResults.filter(
        (notificacion) =>
          String(notificacion.pk_id_not).includes(filterValue) ||
          String(notificacion.tipo_not)
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          String(notificacion.texto_not)
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          String(notificacion.fk_id_subasta).includes(filterValue) ||
          String(notificacion.fk_id_usuario).includes(filterValue) ||
          String(notificacion.nombre_user).includes(filterValue)
      );
    }

    return filteredResults;
  }, [Notificaciones, filterValue]);

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

  const renderCell = useCallback((notificacion, columnKey) => {
    const cellValue = notificacion[columnKey];

    switch (columnKey) {
      case "fecha_not":
        return new Date(cellValue).toLocaleString("es-ES", {
          timeZone: "America/Bogota",
        });
      case "actions": // Agregar este caso
        return (

          <div className="flex gap-2 "> {/* Agregar un contenedor flexible para los botones */}
            <Button
               className="text-white bg-[#39A800] h-10 w-4  rounded-lg font-bold "
              radius="md"
              size="sm"
              onPress={() => navigate(`/profile/${notificacion.fk_id_usuario}`)}
            >
              <FaRegCircleUser className="text-2xl" />
            </Button>
            <Button
              className=" h-10 w-4  rounded-lg font-bold   bg-gray-200 text-[#39A800]   hover:bg-[#39A800]  hover:text-gray-200"
              radius="md"
              size="sm"
              onClick={() => handdleModaSub(notificacion.fk_id_subasta)}
            >
              <RiEyeLine className="text-2xl" />
            </Button>
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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 px-10 pt-10 ">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className=" w-full border rounded-xl border-grisMedio "
            placeholder="Buscar Notificacion..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center m-4 ">
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
          
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2 ">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
            className="w-1/2 bg-gray-200 text-[#39A800]   hover:bg-[#39A800]  hover:text-gray-200"
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            className="w-1/2 bg-[#39A800]  text-white hover:bg-gray-200 hover:text-[#39A800]  "
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <div className=" w-full ">
         <div className="w-full h-auto px-8 ">
      <ModalSubCoffee
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
      />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: " bg-[#FDFBF6] px-9 text-[#323232] drop-shadow-md md:drop-shadow-xl text-base",
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
              className="bg-[#38a800c7] text-white text-sm  drop-shadow-md md:drop-shadow-xl"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"notificacion no encontrado"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.pk_id_not}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      


      {/* <Button onClick={clickNot}>
        usa este boton
      </Button> */}

    </div>
    </div>
 
  );

}

