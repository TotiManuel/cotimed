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
import RegistroProveedor from "./pages/RegistroProveedor";
import RegistroInstitucion from "./pages/RegistroInstitucion";

import Equipamiento from "./pages/public/equipamento";
import Proveedor from "./pages/public/proveedor";
import Institucion from "./pages/public/institucion";

import Solicitud from "./pages/solicitud";


// Admin

import Usuarios from "./pages/admin/Usuarios";
import Instituciones from "./pages/admin/Instituciones";
import Proveedores from "./pages/admin/Proveedores";
import Equipamientos from "./pages/admin/Equipamientos";
import Solicitudes from "./pages/admin/Solicitudes";
import Cotizaciones from "./pages/admin/Cotizaciones";
import Reportes from "./pages/admin/Reportes";


// Dashboard general por rol

import Dashboard from "./pages/dashboard/Dashboard";


// Institución

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



            {/* Dashboard según rol */}

            <Route

              path="/dashboard"

              element={<Dashboard />}

            />




            {/* Institución */}


            <Route

              path="/institucion/solicitudes/nueva"

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





            {/* General */}


            <Route

              path="/"

              element={<Home />}

            />


            <Route

              path="/perfil"

              element={<Perfil />}

            />


            <Route

              path="/configuracion"

              element={<Configuracion />}

            />




            {/* Admin */}


            <Route

              path="/usuarios"

              element={<Usuarios />}

            />


            <Route

              path="/instituciones"

              element={<Instituciones />}

            />


            <Route

              path="/proveedores"

              element={<Proveedores />}

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

              path="/cotizaciones"

              element={<Cotizaciones />}

            />


            <Route

              path="/reportes"

              element={<Reportes />}

            />





            {/* Públicos dentro de layout privado */}


            <Route

              path="/equipamiento"

              element={<Equipamiento />}

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


          </Route>



        </Routes>


      </BrowserRouter>


    </AuthProvider>


  );


}


export default App;