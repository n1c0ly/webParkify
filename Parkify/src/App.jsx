import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Cadastro from "./pages/cadastro";
import Vagas from "./pages/vagas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/vagas" element={<Vagas />} />
      </Routes>
    </BrowserRouter>
  );
}
