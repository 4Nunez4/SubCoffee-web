import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MiCuenta from "./pages/MiCuenta.jsx";
import PerfilUsuario from "./pages/PerfilUsuario.jsx";
import Subasta from "./pages/Subasta.jsx";
import ChatInfo from "./components/ChatInfo.jsx"
import { TerminosyCondiciones } from "./components/TerminosCondiciones";
import Notificaciones from "./pages/Notificaciones.jsx";
import Login from "./components/Login.jsx";
import Oferta from "./pages/Oferta.jsx";
import Historial from "./pages/Historial.jsx";
import RegistrarFinca from "./pages/RegistrarFinca.jsx";
import CrearSubasta from "./pages/CrearSubasta.jsx";
import Home from "./pages/Home.jsx"
import Registro from "./components/Registro.jsx";
import Dashboard from "./components/organismos/Dashboard.jsx"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/registrarfinca" element={<RegistrarFinca />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/MiCuenta" element={<MiCuenta />} /> 
          <Route path="/perfil" element={<PerfilUsuario />} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
          <Route path="/chat" element={<ChatInfo />} />
          <Route path="/subasta" element={<Subasta />} />
          <Route path="/terminosycondiciones" element={<TerminosyCondiciones/>} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/Oferta" element={<Oferta />} />
          <Route path="/CrearSubasta" element={<CrearSubasta />} />
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/ResultadoModal" element={<ResultadoModal />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
