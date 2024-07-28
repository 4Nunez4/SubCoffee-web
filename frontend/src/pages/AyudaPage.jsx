import React, { useRef } from "react";

import ComoCrearSubasta from "./ComoCrearUnaSubasta";
import InfoRolesA from "./InfoRolesA";
import ComoPujarUnaSubasta from "./ComoPujarUnaSubasta";

function AyudaPage() {
  const comoCrearRef = useRef(null);
  const comoPujarRef = useRef(null);
  const infoRolesRef = useRef(null);

  return (
    <div className="flex justify-center mb-8 bg-[#FDFBF6]">
      <div className="flex flex-col items-center max-w-7xl px-12">
        <div className={`flex flex-col`}>
          <div>
            <div ref={comoCrearRef} data-section="comoCrear">
              <ComoCrearSubasta />
            </div>
            <div ref={comoPujarRef} data-section="comoPujar">
              <ComoPujarUnaSubasta />
            </div>
            <div ref={infoRolesRef} data-section="infoRoles">
              <InfoRolesA />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AyudaPage;
