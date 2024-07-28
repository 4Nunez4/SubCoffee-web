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
import QueremosLograr from "./pages/QueremosLograr";
import ResetPassword from "./pages/ResetPassword";
import RecuperarPasswordUserLogin from "./components/molecules/RecuperarPasswordUserLogin";
import DatosEstadisticos from "./pages/DatosEstadisticos";
import NotificacionesTable from "./components/Guard/NotificacionesTable";

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
                <Route path="queremoslograr" element={<QueremosLograr />} />
                <Route path="ayuda" element={<AyudaPage />} />
                  <Route path="datosEstadisticos" element={<DatosEstadisticos />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="subcoffee" element={<SubastaPage />} />
                  <Route path="datosEstadisticos" element={<DatosEstadisticos />} />
                  <Route path="notificaciones" element={<NotificacionesTable />} />
                  <Route path="profile/:id" element={<ProfileUser />} />
                  <Route path="subasta/:id" element={<SubastaUser />} />
                  <Route path="users" element={<UsersTable />} />
                  <Route path="geografia" element={<GeografiaFullPage />} />
                  <Route path="tipo_variedad" element={<TipoVariedadTable />} />
                  <Route path="mi_subasta" element={<MiSubastaT />} />
                </Route>
              </Route>
              <Route path="update-password" element={<RecuperarPasswordUserLogin />} /> 
              <Route path="reset-password" element={<ResetPassword />} /> 
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
