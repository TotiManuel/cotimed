import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/public/home";
import Institucion from "./pages/public/institucion";
import Proveedor from "./pages/public/proveedor";
import Equipamiento from "./pages/public/equipamiento";
import Solicitudes from "./pages/public/solicitudes";

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
            <Route path="/equipamiento" element={<Equipamiento />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
          </Route>

          {/* =========================
              RUTAS PRIVADAS
          ========================= */}

        </Routes>
      </BrowserRouter>
  );
}

export default App;