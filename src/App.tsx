import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/public/home";
import Institucion from "./pages/public/institucion";

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
          </Route>

          {/* =========================
              RUTAS PRIVADAS
          ========================= */}

        </Routes>
      </BrowserRouter>
  );
}

export default App;