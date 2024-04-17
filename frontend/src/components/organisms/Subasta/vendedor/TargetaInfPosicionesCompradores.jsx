import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {users} from "./data";

const CardContainer = ({ children }) => {

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 3;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (    
<div >
<Table className=" bg-lime-500"
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center ">
          <Pagination 
            isCompact
            showControls
            showShadow
            color="warning"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader >
        <TableColumn  key="name">POSICION</TableColumn>
        <TableColumn key="role">NOMBRE</TableColumn>
        <TableColumn key="status">OFERTA</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow  key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
     
    </Table>

     {children}  
</div>

    );
}

export default CardContainer;
