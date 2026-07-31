import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/public/home";
import Institucion from "./pages/public/institucion";
import Proveedor from "./pages/public/proveedor";
import Equipamiento from "./pages/public/equipamiento";
import Solicitudes from "./pages/public/solicitudes";
import Login from "./pages/auth/login";
import RegistroInstitucion from "./pages/auth/registro/institucion";
import RegistroProveedor from "./pages/auth/registro/proveedor";

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
            <Route path="/login" element={<Login />} />
            <Route path="/registro/institucion" element={<RegistroInstitucion />} />
            <Route path="/registro/proveedor" element={<RegistroProveedor />} />
          </Route>

          {/* =========================
              RUTAS PRIVADAS
          ========================= */}

        </Routes>
      </BrowserRouter>
  );
}

export default App;