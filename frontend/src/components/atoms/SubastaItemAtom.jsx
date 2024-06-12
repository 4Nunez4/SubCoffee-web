import React from 'react';

function SubastaItemAtom({ subasta }) {
  return (
    <div className="border p-2 my-2">
      <h3 className="text-lg font-bold">{subasta.titulo}</h3>
      <p className="text-sm">{subasta.descripcion}</p>
      <p className="text-sm font-bold">{subasta.cantidad} €</p>
    </div>
  );
}

export default SubastaItemAtom;
