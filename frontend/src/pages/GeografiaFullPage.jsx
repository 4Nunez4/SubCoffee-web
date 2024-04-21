import React, { useState } from "react";
import ButtonAtom from "../components/atoms/ButtonAtom";
import AbrirModalTemplate from "../components/templates/AbrirModalTemplate";
import ButtonCerrarModalAtom from "../components/atoms/ButtonCerrarModalAtom";
import RegisterPageDepartamento from "../components/organisms/RegisterPageDepartamento";
import RegisterPageMunicipio from "../components/organisms/RegisterPageMunicipio";
import RegisterPageVereda from "../components/organisms/RegisterPageVereda";
import RegisterPageTipoVariedad from "../components/organisms/RegisterPageTipoVariedad";
import { Button } from "@nextui-org/react";

function GeografiaFullPage() {
  const [abrirModalDepartamento, setAbrirModalDepartamento] = useState(false);
  const [abrirModalMunicipio, setAbrirModalMunicipio] = useState(false);
  const [abrirModalVereda, setAbrirModalVereda] = useState(false);
  const [abrirModalTipoVari, setAbrirModalTipoVari] = useState(false);

  const toggleAbrirModalDepartamento = () => {
    setAbrirModalDepartamento(!abrirModalDepartamento);
  };
  const toggleAbrirModalMunicipio = () => {
    setAbrirModalMunicipio(!abrirModalMunicipio);
  };
  const toggleAbrirModalVereda = () => {
    setAbrirModalVereda(!abrirModalVereda);
  };
  const toggleAbrirModalTipoVari = () => {
    setAbrirModalTipoVari(!abrirModalTipoVari);
  };

  return (
    <div className="flex p-10 gap-x-4">
      <ButtonAtom onClick={() => setAbrirModalDepartamento(true)}>
        Registrar Departamento
      </ButtonAtom>
      <ButtonAtom onClick={() => setAbrirModalMunicipio(true)}>
        Registrar Municipio
      </ButtonAtom>
      <ButtonAtom onClick={() => setAbrirModalVereda(true)}>
        Registrar Vereda
      </ButtonAtom>
      <ButtonAtom onClick={() => setAbrirModalTipoVari(true)}>
        Registrar Tipo variedad
      </ButtonAtom>
      {abrirModalDepartamento && (
        <AbrirModalTemplate>
          <RegisterPageDepartamento
            onClose={toggleAbrirModalDepartamento}
            mode="create"
          />
          <ButtonCerrarModalAtom onClose={toggleAbrirModalDepartamento} />
        </AbrirModalTemplate>
      )}
      {abrirModalMunicipio && (
        <AbrirModalTemplate>
          <RegisterPageMunicipio
            onClose={toggleAbrirModalMunicipio}
            mode="create"
          />
          <ButtonCerrarModalAtom onClose={toggleAbrirModalMunicipio} />
        </AbrirModalTemplate>
      )}
      {abrirModalVereda && (
        <AbrirModalTemplate>
          <RegisterPageVereda
            onClose={toggleAbrirModalVereda}
            mode="create"
          />
          <ButtonCerrarModalAtom onClose={toggleAbrirModalVereda} />
        </AbrirModalTemplate>
      )}
      {abrirModalTipoVari && (
        <AbrirModalTemplate>
          <RegisterPageTipoVariedad
            onClose={toggleAbrirModalTipoVari}
            mode="create"
          />
          <ButtonCerrarModalAtom onClose={toggleAbrirModalTipoVari} />
        </AbrirModalTemplate>
      )}
    </div>
  );
}

export default GeografiaFullPage;
