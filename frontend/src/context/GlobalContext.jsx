import React, { createContext } from "react";
import { DeparProvider } from "./DeparContext";
import { TipoVariProvider } from "./TipoVariContext";
import { MunicipioProvider } from "./MunicipioContext";
import { VeredaProvider } from "./VeredaContext";
import { FincaProvider } from "./FincaContext";
import { AuthProvider } from "./AuthContext";
import { VariedadUserProvider } from "./VariedadUserContext";
import { SubastaProvider } from "./SubastaContext";
import { PostulantesProvider } from "./PostulantesContext";
import { OfertaProvider } from "./OfertasContext";
import { NotificacionesProvider } from "./NotificacionesContext";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const globalContextValue = {}

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <AuthProvider>
        <DeparProvider>
          <TipoVariProvider>
            <MunicipioProvider>
              <VeredaProvider>
                <FincaProvider>
                  <VariedadUserProvider> 
                    <SubastaProvider>
                      <PostulantesProvider>
                        <OfertaProvider>
                          <NotificacionesProvider>
                            {children}
                          </NotificacionesProvider>
                        </OfertaProvider>
                      </PostulantesProvider>
                    </SubastaProvider>
                  </VariedadUserProvider>
                </FincaProvider>
              </VeredaProvider>
            </MunicipioProvider>
          </TipoVariProvider>
        </DeparProvider>
      </AuthProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
