import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import institucionRoutes from "./routes/institucion.routes";
import proveedorRoutes from "./routes/proveedor.routes";
import equipamientoRoutes from "./routes/equipamiento.routes";
import solicitudRoutes from "./routes/solicitud.routes";
import cotizacionRoutes from "./routes/cotizacion.routes";
import reporteRoutes from "./routes/reporte.routes";
import dashboardRoutes from "./routes/dashboard.routes";

dotenv.config();



const app = express();



app.use(cors());

app.use(express.json());



app.use(
    "/api/auth",
    authRoutes
);

app.use(
  "/api/reportes",
  reporteRoutes
);

app.use(
    "/api/users",
    userRoutes
);

app.use(

  "/api/dashboard",

  dashboardRoutes

);

app.use(
    "/api/admin",
    adminRoutes
);


app.use(
    "/api/instituciones",
    institucionRoutes
);


app.use(
    "/api/proveedores",
    proveedorRoutes
);


app.use(
    "/api/equipamientos",
    equipamientoRoutes
);


app.use(
    "/api/solicitudes",
    solicitudRoutes
);


app.use(
    "/api/cotizaciones",
    cotizacionRoutes
);



app.get("/",(req,res)=>{

    res.json({

        message:"CotiMed API funcionando"

    });

});



const PORT =
process.env.PORT || 3000;



app.listen(
    PORT,
    ()=>{

        console.log(
            `Servidor iniciado en puerto ${PORT}`
        );

    }
);