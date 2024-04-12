import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function ListSubastas() {
  const [getSubastas, setGetSubastas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const res = setTimeout(() => {
      setFilterdates(getSubastas);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(res);
  }, []);

  const handleChange = (e) => {
    const res = data.filter((getSubastas) => {
      return getSubastas.nombre
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setGetSubastas(res);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <DataTable
        title="Subastas Creadas"
        paginationPerPage={10}
        fixedHeader
        progressPending={loading}
        progressComponent={<h1>Cargando</h1>}
      />
    </div>
  );
}

export default ListSubastas;
