import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SubCoffee from "./pages/SubCoffee";
import NotFound from "./pages/NotFound";
import Subasta from "./pages/Subasta.jsx";
import Chat from "./pages/Chat";

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
