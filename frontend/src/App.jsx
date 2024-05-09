import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

import SubastaPage from "./pages/SubastaPage";
import Dashboard from "./pages/Dashboard";
import ProfileUser from "./pages/ProfileUser";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import AyudaPage from "./pages/AyudaPage";
import DashboardContentOrganims from "./components/organisms/DashboardContentOrganims";
import GeografiaFullPage from "./pages/GeografiaFullPage";
import UsersT from "./pages/UsersT";
import MiSubastaT from "./pages/MiSubastaT";
import QuienesSomosA from "./pages/QuienesSomosA";
import TipoVariedadT from "./pages/TipovariedadT"
import PoliticasYCondicionesPageA from "./pages/PoliticasYCondicionesPageA";
import SubastaUser from "./pages/SubastaUser";

function App() {

  const users = JSON.parse(localStorage.getItem("user"));

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
                  <Route path="/subasta/:id" element={<SubastaUser />} />
                  {users && users.rol_user === "admin" && (
                    <>
                      <Route path="/users" element={<UsersT />} />
                      <Route path="/geografia" element={<GeografiaFullPage />} />
                      <Route path="/tipo_variedad" element={<TipoVariedadT />} />
                    </>
                  )}
                  {users && users.rol_user !== "comprador" && (
                    <>
                      <Route path="/mi_subasta" element={<MiSubastaT />} />
                    </>
                  )}
                </Route>
              </Route>

              <Route element={<Dashboard />}>
                <Route index element={<DashboardContentOrganims />} />
                <Route path="/privacy-policy" element={<PoliticasYCondicionesPageA />} />
                <Route path="/somos" element={<QuienesSomosA />} />
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
