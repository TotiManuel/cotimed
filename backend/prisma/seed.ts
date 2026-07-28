import {
  PrismaClient,
  RolUsuario,
  EstadoUsuario,
  EstadoSolicitud,
  EstadoCotizacion
} from "@prisma/client";

import bcrypt from "bcrypt";


const prisma = new PrismaClient();



async function main() {


  const password =
    await bcrypt.hash(
      "123456",
      10
    );



  /*
  ============================
  USUARIOS
  ============================
  */


  const admin =
    await prisma.user.upsert({

      where:{
        email:"admin@cotimed.com"
      },

      update:{},

      create:{

        nombre:"Administrador",

        apellido:"Sistema",

        email:"admin@cotimed.com",

        telefono:"3510000000",

        password,

        rol:RolUsuario.ADMIN,

        estado:EstadoUsuario.ACTIVO

      }

    });

  const institucionUser =
    await prisma.user.upsert({

      where:{
        email:"institucion@cotimed.com"
      },

      update:{},

      create:{

        nombre:"Clínica",

        apellido:"Central",

        email:"institucion@cotimed.com",

        telefono:"3511111111",

        password,

        rol:RolUsuario.INSTITUCION,

        estado:EstadoUsuario.ACTIVO

      }

    });

  const proveedorUser =
    await prisma.user.upsert({

      where:{
        email:"proveedor@cotimed.com"
      },

      update:{},

      create:{

        nombre:"Carlos",

        apellido:"Proveedor",

        email:"proveedor@cotimed.com",

        telefono:"3512222222",

        password,

        rol:RolUsuario.PROVEEDOR,

        estado:EstadoUsuario.ACTIVO

      }

    });

  const institucion =
    await prisma.institucion.upsert({

      where:{
        usuarioId:institucionUser.id
      },

      update:{},

      create:{

        usuarioId:
        institucionUser.id,

        nombre:
        "Clínica Central Villa María",

        nombreComercial:
        "CCVM",

        cuit:
        "30-12345678-9",

        telefono:
        "3534000000",

        direccion:
        "Av. Principal 123",

        ciudad:
        "Villa María",

        provincia:
        "Córdoba"

      }

    });

  const empleado =
    await prisma.user.upsert({

      where:{
        email:"empleado@cotimed.com"
      },

      update:{},

      create:{

        nombre:"Juan",

        apellido:"Empleado",

        email:"empleado@cotimed.com",

        telefono:"3513333333",

        password,

        rol:
        RolUsuario.EMPLEADO,

        estado:
        EstadoUsuario.ACTIVO,

        institucionId:
        institucion.id

      }

    });

  const proveedor =
    await prisma.proveedor.upsert({

      where:{
        usuarioId:proveedorUser.id
      },

      update:{},

      create:{

        usuarioId:
        proveedorUser.id,

        nombreEmpresa:
        "MedTech Argentina",

        cuit:
        "30-98765432-1",

        telefono:
        "3515000000",

        direccion:
        "Zona Industrial",

        ciudad:
        "Córdoba",

        provincia:
        "Córdoba",

        descripcion:
        "Proveedor de equipamiento médico"

      }

    });


  /*
  ============================
  SOLICITUD
  ============================
  */


  const solicitud =
    await prisma.solicitud.create({

      data:{

        institucionId:
        institucion.id,


        titulo:
        "Monitor multiparamétrico",


        descripcion:
        "Se necesitan monitores para terapia intensiva",


        categoria:
        "Monitoreo",


        cantidad:
        5,


        marcaPreferida:
        "Philips",


        presupuestoMax:
        5000000,


        estado:
        EstadoSolicitud.RECIBIENDO_COTIZACIONES


      }

    });






  /*
  ============================
  COTIZACION
  ============================
  */


  await prisma.cotizacion.create({

    data:{


      solicitudId:
      solicitud.id,


      proveedorId:
      proveedor.id,


      precio:
      4500000,


      moneda:
      "ARS",


      tiempoEntrega:
      "15 días",


      garantia:
      "2 años",


      observaciones:
      "Incluye instalación",


      incluyeEnvio:
      true,


      estado:
      EstadoCotizacion.ENVIADA


    }

  });





  console.log("=================================");
  console.log("✅ Seed Cotimed creado correctamente");
  console.log("=================================");
  console.log("");
  console.log("Usuarios:");
  console.log("");
  console.log("ADMIN");
  console.log("admin@cotimed.com");
  console.log("");
  console.log("INSTITUCION");
  console.log("institucion@cotimed.com");
  console.log("");
  console.log("PROVEEDOR");
  console.log("proveedor@cotimed.com");
  console.log("");
  console.log("EMPLEADO");
  console.log("empleado@cotimed.com");
  console.log("");
  console.log("Contraseña:");
  console.log("123456");


}



main()

.catch((error)=>{

  console.error(error);

  process.exit(1);

})


.finally(async()=>{

  await prisma.$disconnect();

});