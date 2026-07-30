import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import {
    AuthProvider
} from "./context/AuthContext";


import ProtectedRoute from "./routes/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";



// PUBLIC

import Home from "./pages/public/home";
import Login from "./pages/public/login";

import RecuperarPassword from "./pages/RecuperarPassword";

import RegistroProveedor from "./pages/RegistroProveedor";
import RegistroInstitucion from "./pages/RegistroInstitucion";

import Equipamiento from "./pages/public/equipamento";
import Proveedor from "./pages/public/proveedor";
import Institucion from "./pages/public/institucion";



// PRIVATE GENERAL

import Dashboard from "./pages/dashboard/Dashboard";

import Perfil from "./pages/profile/Perfil";

import Configuracion from "./pages/configuracion/Configuracion";



// INSTITUCION

import NuevaSolicitud from "./pages/institucion/NuevaSolicitud";
import SolicitudesInstitucion from "./pages/institucion/Solicitudes";
import CotizacionesInstitucion from "./pages/institucion/Cotizaciones";
import ProveedoresInstitucion from "./pages/institucion/Proveedores";
import EquipamientosInstitucion from "./pages/institucion/Equipamientos";
import ReportesInstitucion from "./pages/institucion/Reportes";



// ADMIN

import Usuarios from "./pages/admin/Usuarios";
import Instituciones from "./pages/admin/Instituciones";
import Proveedores from "./pages/admin/Proveedores";
import Equipamientos from "./pages/admin/Equipamientos";
import Solicitudes from "./pages/admin/Solicitudes";
import Cotizaciones from "./pages/admin/Cotizaciones";
import Reportes from "./pages/admin/Reportes";




function App(){


return (

<AuthProvider>


<BrowserRouter>


<Routes>




{/* =========================
        RUTAS PUBLICAS
========================= */}



<Route

element={<PublicLayout />}

>


<Route

path="/"

element={<Home />}

/>


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


</Route>



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





{/* =========================
        RUTAS PRIVADAS
========================= */}



<Route


element={

<ProtectedRoute>

<PrivateLayout />

</ProtectedRoute>

}


>



{/* GENERAL */}



<Route

path="/dashboard"

element={<Dashboard />}

/>



<Route

path="/perfil"

element={<Perfil />}

/>



<Route

path="/configuracion"

element={<Configuracion />}

/>





{/* =========================
        INSTITUCION
========================= */}



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






{/* =========================
        ADMIN
========================= */}



<Route

path="/admin/usuarios"

element={<Usuarios />}

/>



<Route

path="/admin/instituciones"

element={<Instituciones />}

/>



<Route

path="/admin/proveedores"

element={<Proveedores />}

/>



<Route

path="/admin/equipamientos"

element={<Equipamientos />}

/>



<Route

path="/admin/solicitudes"

element={<Solicitudes />}

/>



<Route

path="/admin/cotizaciones"

element={<Cotizaciones />}

/>



<Route

path="/admin/reportes"

element={<Reportes />}

/>



</Route>



</Routes>


</BrowserRouter>


</AuthProvider>

);

}



export default App;