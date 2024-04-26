import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

import SubastaPage from "./pages/SubastaPage";
import Dashboard from "./pages/Dashboard";
import ProfileUser from "./pages/ProfileUser";
import ComoCrearUnaSubasta from "./pages/ComoCrearUnaSubasta";
import ComoPujarUnaSubasta from "./pages/ComoPujarUnaSubasta";
import Configuration from "./pages/Configuration";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import AyudaPage from "./pages/AyudaPage";
import DashboardContentOrganims from "./components/organisms/DashboardContentOrganims";
import UsersPage from "./pages/UsersPage";
import PoliticasYCondicionesPage from "./pages/PoliticasYCondicionesPage";
import GeografiaFullPage from "./pages/GeografiaFullPage";
import UsersT from "./pages/UsersT";
import { DepartamentoT } from "./pages/DepartamentoT";
import TipoVariedadT from "./pages/TipovariedadT";
import MiSubastaT from "./pages/MiSubastaT";

function App() {
  const storedUser = localStorage.getItem("user");
  const users = storedUser ? JSON.parse(storedUser) : null;
  return (
    <>
      <NextUIProvider>
        <Toaster />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Dashboard />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="/subcoffee" element={<SubastaPage />} />
                  <Route path="/profile/:id" element={<ProfileUser />} />
                  <Route path="/ayudaCrear" element={<ComoCrearUnaSubasta />} />
                  <Route path="/ayudapujar" element={<ComoPujarUnaSubasta />} />
                  <Route path="/configuration" element={<Configuration />} />
                  <Route path="/ayudaaa" element={<AyudaPage />} />
                  {users && users.rol_user === "admin" && (
                    <>
                      <Route path="/users" element={<UsersT />} />
                      <Route path="/geografia" element={<GeografiaFullPage />} />
                      <Route path="/departamentos" element={<DepartamentoT/>} />
                      <Route path="/tipo_variedad" element={<TipoVariedadT />} />
                    </>
                  )}
                  {users && users.rol_user === "vendedor" && (
                    <>
                      <Route path="/mi_subasta" element={<MiSubastaT />} />
                    </>
                  )}
                  {users && users.rol_user === "comprador" && (
                    <>
                      <Route path="/usuarios" element={<UsersPage />} />
                    </>
                  )}
                </Route>
              </Route>

              <Route element={<Dashboard />}>
                <Route index element={<DashboardContentOrganims />} />
                <Route path="/comopujar" element={<ComoCrearUnaSubasta />} />
                <Route path="/poli" element={<PoliticasYCondicionesPage />} />
                <Route path="/comosubastar" element={<ComoPujarUnaSubasta />} />
                <Route path="/ayudaCrear" element={<ComoCrearUnaSubasta />} />
                <Route path="/ayudapujar" element={<ComoPujarUnaSubasta />} />
                <Route path="/ayuda" element={<AyudaPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
