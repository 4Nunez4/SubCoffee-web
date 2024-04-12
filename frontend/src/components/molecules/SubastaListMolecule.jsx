import React from 'react';
import SubastaItemAtom from '../atoms/SubastaItemAtom';

function SubastaListMolecule({ data }) {
  return (
    <div className="my-2">
      {data.map((subasta) => (
        <SubastaItemAtom key={subasta.id} subasta={subasta} />
      ))}
    </div>
  );
}

export default SubastaListMolecule;
