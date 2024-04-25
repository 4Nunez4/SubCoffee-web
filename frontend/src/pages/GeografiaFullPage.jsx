import React from "react";
import { DepartamentoT } from "./DepartamentoT";
import MunicipioT from "./MunicipioT";
import VeredaT from "./VeredaT";

function GeografiaFullPage() {
  return (
    <div className="flex flex-col px-10 gap-x-4 bg-gray-100">
      <DepartamentoT />
      <MunicipioT />
      <VeredaT />
    </div>
  );
}

export default GeografiaFullPage;
