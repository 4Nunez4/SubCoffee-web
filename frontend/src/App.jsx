import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import SubastaPage from "./pages/SubastaPage";
import Dashboard from "./components/organisms/Dashboard";
import ProfileUser from "./pages/ProfileUser";
import ProtectedRoute from "./ProtectedRoute";
import AyudaPage from "./pages/AyudaPage";
import DashboardContentOrganims from "./pages/DashboardContentOrganims";
import GeografiaFullPage from "./pages/GeografiaFullPage";
import MiSubastaT from "./pages/MiSubastaT";
import QuienesSomosA from "./pages/QuienesSomosA";
import PoliticasYCondicionesPageA from "./pages/PoliticasYCondicionesPageA";
import SubastaUser from "./pages/SubastaUser";
import UsersTable from "./components/Guard/UsersTable";
import TipoVariedadTable from "./components/Guard/TipoVariedadTable";
import GlobalProvider from "./context/GlobalContext";
import ListarNotificaciones from "./pages/Notificaciones";

const users = JSON.parse(localStorage.getItem("user"));

function App() {

  return (
    <>
      <NextUIProvider>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />}>
                <Route index element={<DashboardContentOrganims />} />
                <Route path="privacy-policy" element={<PoliticasYCondicionesPageA />} />
                <Route path="somos" element={<QuienesSomosA />} />
                <Route path="ayuda" element={<AyudaPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="notificaciones" element={<ListarNotificaciones />} />
                  <Route path="subcoffee" element={<SubastaPage />} />
                  <Route path="profile/:id" element={<ProfileUser />} />
                  <Route path="subasta/:id" element={<SubastaUser />} />
                  <Route path="users" element={<UsersTable />} />
                  <Route path="geografia" element={<GeografiaFullPage />} />
                  <Route path="tipo_variedad" element={<TipoVariedadTable />} />
                  <Route path="mi_subasta" element={<MiSubastaT />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
