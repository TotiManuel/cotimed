import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/public/home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =========================
              RUTAS PÚBLICAS
          ========================= */}

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* =========================
              RUTAS PRIVADAS
          ========================= */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;