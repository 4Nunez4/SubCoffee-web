import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import SubCoffee from "./pages/SubCoffee";
import NotFound from "./pages/NotFound";
import { TerminosyCondiciones } from "./components/TerminosCondiciones";
import { Login } from "./components/Login";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subcoffee" element={<SubCoffee />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/terminosycondiciomes" element={<TerminosyCondiciones/>} />
         
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
