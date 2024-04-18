import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {Toaster} from "react-hot-toast"

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
import SubastaComprador from "./pages/SubastaComprador";
import SubastaVendedor from "./pages/SubastaVendedor";


function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />} >
              <Route element={<ProtectedRoute />}>
                <Route path="/subcoffee" element={<SubastaPage />} />
                <Route path="/usuarios" element={<UsersPage />} />
                <Route path="/profile" element={<ProfileUser />} />
                <Route path="/ayudaCrear" element={<ComoCrearUnaSubasta />} />
                <Route path="/ayudacomopujar" element={<ComoPujarUnaSubasta />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/ayudaaa" element={<AyudaPage />} />
              </Route>
            </Route>

            <Route element={<Dashboard />}>
              <Route index element={<DashboardContentOrganims />} />
              <Route path="/comopujar" element={<ComoCrearUnaSubasta />} />
              <Route path="/politicas" element={<PoliticasYCondicionesPage />} />
              <Route path="/comosubastar" element={<ComoPujarUnaSubasta />} />
              <Route path="/ayudaCrear" element={<ComoCrearUnaSubasta />} />
              <Route path="/ayudacomopujar" element={<ComoPujarUnaSubasta />} />
              <Route path="/ayuda" element={<AyudaPage />} />
              <Route path="/subastaVendedor" element={<SubastaVendedor />} />
              <Route path="/subastacomprador" element={<SubastaComprador />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
