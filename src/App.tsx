import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/DashboardLayout";

import Home from "./pages/public/home";
import Institucion from "./pages/public/institucion";
import Proveedor from "./pages/public/proveedor";
import Equipamiento from "./pages/public/equipamiento";
import Solicitudes from "./pages/public/solicitudes";
import Login from "./pages/auth/login";
import RegistroInstitucion from "./pages/auth/registro/institucion";
import RegistroProveedor from "./pages/auth/registro/proveedor";
import SeleccionarRol from "./pages/auth/ElegirRol";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import InstitucionesAdmin from "./pages/admin/InstitucionesAdmin";
import ProveedoresAdmin from "./pages/admin/ProveedoresAdmin";
import EquipamientosAdmin from "./pages/admin/EquipamientosAdmin";
import SolicitudesAdmin from "./pages/admin/SolicitudesAdmin";
import EstadisticasAdmin from "./pages/admin/EstadisticasAdmin";
import ConfiguracionAdmin from "./pages/admin/ConfiguracionAdmin";

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
            <Route path="/seleccionar-rol" element={<SeleccionarRol />} />
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          </Route>

          {/* =========================
              RUTAS PRIVADAS
          ========================= */}
          <Route path="/admin" element={<PrivateLayout />}>

            <Route
                path="dashboard"
                element={<DashboardAdmin />}
            />

            <Route
                path="instituciones"
                element={<InstitucionesAdmin />}
            />

            <Route
                path="proveedores"
                element={<ProveedoresAdmin />}
            />

            <Route
                path="equipamientos"
                element={<EquipamientosAdmin />}
            />

            <Route
                path="solicitudes"
                element={<SolicitudesAdmin />}
            />

            <Route
                path="estadisticas"
                element={<EstadisticasAdmin />}
            />

            <Route
                path="configuracion"
                element={<ConfiguracionAdmin />}
            />

        </Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;