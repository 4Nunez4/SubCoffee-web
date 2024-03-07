import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import SubCoffee from "./pages/SubCoffee";
import NotFound from "./pages/NotFound";
import Subasta from "./pages/Subasta.jsx";
import Chat from "./pages/Chat";
import { TerminosyCondiciones } from "./components/TerminosCondiciones";


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
         
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
