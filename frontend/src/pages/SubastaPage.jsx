import React, { useState } from "react";

import SubastaCard from "../components/SubastaCard";
import ImagenesSliderOrganism from "../components/organisms/ImagenesSliderOrganism";
import AbrirModalTemplate from "../components/templates/AbrirModalTemplate";
import ButtonCerrarModalAtom from "../components/atoms/ButtonCerrarModalAtom";
import RegisterFincaOrganism from "../components/organisms/RegisterFincaOrganism";
import ButtonAtom from "../components/atoms/ButtonAtom";
import VariedadPageOrganism from "../components/organisms/VariedadPageOrganism";

function SubastaPage() {
  const [showModalFinca, setShowModalFinca] = useState(false);
  const [showModalVari, setShowModalVari] = useState(false);

  const toggleAbrirModalFinca = () => {
    setShowModalFinca(!showModalFinca);
  }
  const toggleAbrirModalVari = () => {
    setShowModalVari(!showModalVari);
  }

  return (
    <div className="px-14">
      <div className="w-full flex flex-col justify-center items-end my-10">
        <ImagenesSliderOrganism />
        <p>¡Tu finca tiene una historia que contar!</p>
      </div>
      <ButtonAtom onClick={() => setShowModalFinca(true)}>Crear finca</ButtonAtom>
      <ButtonAtom onClick={() => setShowModalVari(true)}>Crear Variedad</ButtonAtom>
      <div className="w-full">
        <h1 className="font-semibold ml-5">Borbon</h1>
        <SubastaCard />
      </div>
      {showModalFinca && (
        <AbrirModalTemplate>
          <RegisterFincaOrganism onClose={toggleAbrirModalFinca} />
          <ButtonCerrarModalAtom onClose={() => setShowModalFinca(false)} />
        </AbrirModalTemplate>
      )}
      {showModalVari && (
        <AbrirModalTemplate>
          <VariedadPageOrganism onClose={toggleAbrirModalVari} />
          <ButtonCerrarModalAtom onClose={() => setShowModalVari(false)} />
        </AbrirModalTemplate>
      )}
    </div>
  );
}

export default SubastaPage;
