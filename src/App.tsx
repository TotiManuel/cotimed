import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/public/home";
import Institucion from "./pages/public/institucion";
import Proveedor from "./pages/public/proveedor";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* =========================
              RUTAS PÚBLICAS
          ========================= */}

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/institucion" element={<Institucion />} />
            <Route path="/proveedor" element={<Proveedor />} />
          </Route>

          {/* =========================
              RUTAS PRIVADAS
          ========================= */}

        </Routes>
      </BrowserRouter>
  );
}

export default App;