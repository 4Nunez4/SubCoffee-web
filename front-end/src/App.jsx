import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import SubCoffee from "./pages/SubCoffee";
import NotFound from "./pages/NotFound";
import Subasta from "./pages/Subasta.jsx";

import ChatInfo from "./components/ChatInfo.jsx"
import { TerminosyCondiciones } from "./components/TerminosCondiciones";
import Notificaciones from "./pages/Notificaciones.jsx";
import { Login } from "./components/Login";
import Oferta from "./pages/Oferta.jsx";

import CrearSubasta from "./pages/CrearSubasta.jsx"
import Home from "./pages/Home.jsx"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
          
          <Route path="*" element={<NotFound />} />
          <Route path="/subasta" element={<Subasta />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/terminosycondiciomes" element={<TerminosyCondiciones/>} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/Oferta" element={<Oferta />} />

          <Route path="/CrearSubasta" element={<CrearSubasta />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
