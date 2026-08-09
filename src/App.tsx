import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import InstitucionLayout from "./layouts/InstitucionLayout";
import ProveedorLayout from "./layouts/ProveedorLayout";

import Home from "./pages/public/home";
import Institucion from "./pages/public/institucion";
import Proveedor from "./pages/public/proveedor";
import Equipamiento from "./pages/public/equipamiento";
import Solicitudes from "./pages/public/solicitudes";
import Login from "./pages/auth/login";
import RegistroInstitucion from "./pages/auth/registro/institucion";
import RegistroProveedor from "./pages/auth/registro/proveedor";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import InstitucionesAdmin from "./pages/admin/InstitucionesAdmin";
import ProveedoresAdmin from "./pages/admin/ProveedoresAdmin";
import EquipamientosAdmin from "./pages/admin/EquipamientosAdmin";
import SolicitudesAdmin from "./pages/admin/SolicitudesAdmin";
import CotizacionesAdmin from "./pages/admin/CotizacionesAdmin";
import EstadisticasAdmin from "./pages/admin/EstadisticasAdmin";
import ConfiguracionAdmin from "./pages/admin/ConfiguracionAdmin";
import AddInstitucion from "./pages/admin/instituciones/AddInstitucion";
import VerInstitucion from "./pages/admin/instituciones/VerInstitucion";
import AddProveedor from "./pages/admin/proveedores/AddProveedores";
import VerProveedor from "./pages/admin/proveedores/VerProveedor";
import AddSolicitud from "./pages/admin/solicitudes/AddSolicitud";
import VerSolicitud from "./pages/admin/solicitudes/VerSolicitud";
import AddCotizacion from "./pages/admin/cotizaciones/AddCotizacion";
import VerCotizacion from "./pages/admin/cotizaciones/VerCotizacion";


import DashboardInstitucion from "./pages/institucion/DashboardInstitucion";
import SolicitudesInstitucion from "./pages/institucion/MisSolicitudes";
import CotizacionesInstitucion from "./pages/institucion/CotizacionesInstitucion";
import ComparadorCotizaciones from "./pages/institucion/ComparadorCotizaciones";
import EquipamientosInstitucion from "./pages/institucion/EquipamientosInstitucion";
import ProveedoresInstitucion from "./pages/institucion/ProveedoresInstitucion";
import FavoritosInstitucion from "./pages/institucion/FavoritosInstitucion";
import PerfilInstitucion from "./pages/institucion/PerfilInstitucion";

import DashboardProveedor from "./pages/proveedor/DashboardProveedor";
import MisEquipamientos from "./pages/proveedor/MisEquipamientos";
import AgregarEquipamiento from "./pages/proveedor/AgregarEquipamiento";
import SolicitudesDisponibles from "./pages/proveedor/SolicitudesDisponibles";
import CotizacionesEnviadas from "./pages/proveedor/CotizacionesEnviadas";
import ClientesInstitucion from "./pages/proveedor/ClientesInstitucion";
import PerfilProveedor from "./pages/proveedor/PerfilProveedor";

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
              PANEL ADMIN
          ========================= */}

          <Route 
              path="/admin" 
              element={<AdminLayout />}
          >

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
                  path="cotizaciones"
                  element={<CotizacionesAdmin />}
              />
              <Route
                  path="estadisticas"
                  element={<EstadisticasAdmin />}
              />

              <Route
                  path="configuracion"
                  element={<ConfiguracionAdmin />}
              />
              <Route
                    path="AddInstitucion"
                    element={<AddInstitucion />}
              />
                <Route
                    path="instituciones/:id"
                    element={<VerInstitucion />}
                />
                <Route
                    path="AddProveedor"
                    element={<AddProveedor />}
                />
                <Route
                    path="VerProveedor/:id"
                    element={<VerProveedor />}
                />
                <Route
                    path="AddSolicitud"
                    element={<AddSolicitud />}
                />
                <Route
                    path="VerSolicitud/:id"
                    element={<VerSolicitud />}
                />
                <Route
                    path="AddCotizacion"
                    element={<AddCotizacion />}
                />
                <Route
                    path="VerCotizacion/:id"
                    element={<VerCotizacion />}
                />
          </Route>

          {/* =========================
              PANEL INSTITUCION
          ========================= */}

          <Route
              path="/institucion"
              element={<InstitucionLayout />}
          >


              <Route
                  path="dashboard"
                  element={<DashboardInstitucion />}
              />


              <Route
                  path="solicitudes"
                  element={<SolicitudesInstitucion />}
              />


              <Route
                  path="cotizaciones"
                  element={<CotizacionesInstitucion />}
              />


              <Route
                  path="comparador"
                  element={<ComparadorCotizaciones />}
              />


              <Route
                  path="equipamientos"
                  element={<EquipamientosInstitucion />}
              />


              <Route
                  path="proveedores"
                  element={<ProveedoresInstitucion />}
              />


              <Route
                  path="favoritos"
                  element={<FavoritosInstitucion />}
              />


              <Route
                  path="perfil"
                  element={<PerfilInstitucion />}
              />


          </Route>







          {/* =========================
              PANEL PROVEEDOR
          ========================= */}

          <Route
              path="/proveedor"
              element={<ProveedorLayout />}
          >


              <Route
                  path="dashboard"
                  element={<DashboardProveedor />}
              />


              <Route
                  path="equipamientos"
                  element={<MisEquipamientos />}
              />


              <Route
                  path="agregar-equipamiento"
                  element={<AgregarEquipamiento />}
              />


              <Route
                  path="solicitudes"
                  element={<SolicitudesDisponibles />}
              />


              <Route
                  path="cotizaciones"
                  element={<CotizacionesEnviadas />}
              />


              <Route
                  path="clientes"
                  element={<ClientesInstitucion />}
              />


              <Route
                  path="perfil"
                  element={<PerfilProveedor />}
              />


          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;