import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Perfil from "./pages/profile/Perfil";
import PrivateLayout from "./layouts/PrivateLayout";
import Configuracion from "./pages/configuracion/Configuracion";
import RecuperarPassword from "./pages/RecuperarPassword";
import Login from "./pages/public/login";
import Home from "./pages/public/home";
import RegistroUsuario from "./pages/RegistroUsuario";
import Equipamiento from "./pages/public/equipamento";
import Proveedor from "./pages/public/proveedor";
import Institucion from "./pages/public/institucion";
import Solicitud from "./pages/solicitud";
import Usuarios from "./pages/admin/Usuarios";
import RegistroProveedor from "./pages/RegistroProveedor";
import RegistroInstitucion from "./pages/RegistroInstitucion";
import Instituciones from "./pages/admin/Instituciones";
import Proveedores from "./pages/admin/Proveedores";
import Dashboard from "./pages/dashboard/Dashboard";
import Equipamientos from "./pages/admin/Equipamientos";
import Solicitudes from "./pages/admin/Solicitudes";
import Cotizaciones from "./pages/admin/Cotizaciones";
import Reportes from "./pages/admin/Reportes";


import DashboardInstitucion from "./pages/dashboard/DashboardInstitucion";

import NuevaSolicitud from "./pages/institucion/NuevaSolicitud";

import SolicitudesInstitucion from "./pages/institucion/Solicitudes";

import CotizacionesInstitucion from "./pages/institucion/Cotizaciones";

import ProveedoresInstitucion from "./pages/institucion/Proveedores";

import EquipamientosInstitucion from "./pages/institucion/Equipamientos";

import ReportesInstitucion from "./pages/institucion/Reportes";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>


          {/* Públicas */}

          <Route
            path="/login"
            element={<Login />}
          />


          <Route
            path="/recuperar-password"
            element={<RecuperarPassword />}
          />


          <Route
            path="/registro/proveedor"
            element={<RegistroProveedor />}
          />


          <Route
            path="/registro/institucion"
            element={<RegistroInstitucion />}
          />



          {/* Privadas */}

          <Route
            element={
              <ProtectedRoute>
                <PrivateLayout />
              </ProtectedRoute>
            }
          >

            <Route
            path="/dashboard/institucion"
            element={<DashboardInstitucion />}
            />


            <Route
            path="/solicitudes/nueva"
            element={<NuevaSolicitud />}
            />


            <Route
            path="/institucion/solicitudes"
            element={<SolicitudesInstitucion />}
            />


            <Route
            path="/institucion/cotizaciones"
            element={<CotizacionesInstitucion />}
            />


            <Route
            path="/institucion/proveedores"
            element={<ProveedoresInstitucion />}
            />


            <Route
            path="/institucion/equipamientos"
            element={<EquipamientosInstitucion />}
            />


            <Route
            path="/institucion/reportes"
            element={<ReportesInstitucion />}
            />


            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/usuarios"
              element={<Usuarios />}
            />

            <Route
              path="/instituciones"
              element={<Instituciones />}
            />

            <Route
              path="/perfil"
              element={<Perfil />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/configuracion"
              element={<Configuracion />}
            />

            <Route
              path="/equipamiento"
              element={<Equipamiento />}
            />

            <Route
              path="/equipamientos"
              element={<Equipamientos />}
            />

            <Route
              path="/solicitudes"
              element={<Solicitudes />}
            />

            <Route
              path="/proveedores"
              element={<Proveedores />}
            />

            <Route
              path="/proveedor"
              element={<Proveedor />}
            />

            <Route
              path="/institucion"
              element={<Institucion />}
            />
            <Route 
              path="/registro"
              element={<RegistroUsuario />}
            />


            <Route
              path="/solicitud"
              element={<Solicitud />}
            />

            <Route
              path="/cotizaciones"
              element={<Cotizaciones />}
            />

            <Route
              path="/reportes"
              element={<Reportes />}
            />

          </Route>


        </Routes>


      </BrowserRouter>

    </AuthProvider>

  );

}


export default App;