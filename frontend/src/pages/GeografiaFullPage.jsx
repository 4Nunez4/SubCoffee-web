import React, { useState } from "react";
import ButtonAtom from "../components/atoms/ButtonAtom";
import AbrirModalTemplate from "../components/templates/AbrirModalTemplate";
import ButtonCerrarModalAtom from "../components/atoms/ButtonCerrarModalAtom";
import RegisterPageVereda from "../components/organisms/RegisterPageVereda";
/* import RegisterPageTipoVariedad from "../components/organisms/RegisterPageTipoVariedad"; */
import { DepartamentoT } from "./DepartamentoT";
import MunicipioT from "./MunicipioT";
import TipoVariedadT from "./TipovariedadT"

function GeografiaFullPage() {
  const [abrirModalVereda, setAbrirModalVereda] = useState(false);
/*   const [abrirModalTipoVari, setAbrirModalTipoVari] = useState(false); */

  const toggleAbrirModalVereda = () => {
    setAbrirModalVereda(!abrirModalVereda);
  };
 /*  const toggleAbrirModalTipoVari = () => {
    setAbrirModalTipoVari(!abrirModalTipoVari);
  }; */

  return (
    <div className="flex flex-col px-10 gap-x-4 bg-gray-100">
      <DepartamentoT />
      <MunicipioT />
      <TipoVariedadT/>
      <ButtonAtom onClick={() => setAbrirModalVereda(true)}>
        Registrar Vereda
      </ButtonAtom>
      <ButtonAtom onClick={() => setAbrirModalTipoVari(true)}>
        Registrar Tipo variedad
      </ButtonAtom>
      {abrirModalVereda && (
        <AbrirModalTemplate>
          <RegisterPageVereda
            onClose={toggleAbrirModalVereda}
            mode="create"
          />
          <ButtonCerrarModalAtom onClose={toggleAbrirModalVereda} />
        </AbrirModalTemplate>
      )}
{/*       {abrirModalTipoVari && (
        <AbrirModalTemplate>
          <RegisterPageTipoVariedad
            onClose={toggleAbrirModalTipoVari}
            mode="create"
          />
          <ButtonCerrarModalAtom onClose={toggleAbrirModalTipoVari} />
        </AbrirModalTemplate>
      )} */}
    </div>
  );
}

export default GeografiaFullPage;
