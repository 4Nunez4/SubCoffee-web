import React from "react";

const FooterSectionMolecule = ({ title, children }) => (
  <div className="flex flex-col items-center justify-center ml-8">
    <p className="text-lg font-semibold mb-4">{title}</p>
    {children}
  </div>
);

export default FooterSectionMolecule;
