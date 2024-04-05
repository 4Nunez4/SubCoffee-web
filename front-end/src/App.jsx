import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import MiCuenta from "./pages/MiCuenta.jsx";
import Subasta from "./pages/Subasta.jsx";
import ChatInfo from "./components/ChatInfo.jsx"
import { TerminosyCondiciones } from "./components/TerminosCondiciones";
import Notificaciones from "./pages/Notificaciones.jsx";
import { Login } from "./components/Login";
import Oferta from "./pages/Oferta.jsx";
import Historial from "./pages/Historial.jsx";
import RegistrarFinca from "./pages/RegistrarFinca.jsx";
import CrearSubasta from "./pages/CrearSubasta.jsx";
import Home from "./pages/Home.jsx"
import RegistroUser from "../src/components/moleculas/RegistroUsuario.jsx"


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/historial" element={<Historial />} />
          <Route path="/registrarfinca" element={<RegistrarFinca />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/MiCuenta" element={<MiCuenta />} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
          <Route path="/chat" element={<ChatInfo />} />
          <Route path="*" element={<Dashboard />} />
          <Route path="/subasta" element={<Subasta />} />
          <Route path="/terminosycondiciones" element={<TerminosyCondiciones/>} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/Oferta" element={<Oferta />} />
          <Route path="/CrearSubasta" element={<CrearSubasta />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/RegistroUser" element={<RegistroUser />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
