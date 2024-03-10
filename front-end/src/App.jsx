import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import SubCoffee from "./pages/SubCoffee";
import NotFound from "./pages/NotFound";
import Subasta from "./pages/Subasta.jsx";
import Chat from "./pages/Chat";
import { TerminosyCondiciones } from "./components/TerminosCondiciones";
import Notificaciones from "./pages/Notificaciones.jsx";
import RegistrarFinca from "./pages/RegistrarFinca.jsx";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subcoffee" element={<SubCoffee />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/subasta" element={<Subasta />} />
          <Route path="/terminosycondiciomes" element={<TerminosyCondiciones/>} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/Registrar Finca" element={<RegistrarFinca />} />
         
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
