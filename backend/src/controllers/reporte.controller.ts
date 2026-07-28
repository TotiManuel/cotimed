import { Request, Response } from "express";
import { prisma } from "../config/database";

export const obtenerResumen = async (

  req: Request,

  res: Response

) => {


  try {


    const [

      instituciones,

      proveedores,

      equipamientos,

      solicitudes,

      cotizaciones


    ] = await Promise.all([


      prisma.institucion.count(),


      prisma.proveedor.count(),


      prisma.equipamiento.count(),


      prisma.solicitud.count(),


      prisma.cotizacion.count()


    ]);



    res.json({

      instituciones,

      proveedores,

      equipamientos,

      solicitudes,

      cotizaciones

    });



  } catch(error) {


    console.error(error);


    res.status(500).json({

      mensaje:"Error obteniendo resumen"

    });


  }


};










export const solicitudesReporte = async (

  req: Request,

  res: Response

) => {


  try {


    const datos = await prisma.solicitud.groupBy({

      by:[

        "estado"

      ],

      _count:{

        estado:true

      }


    });



    res.json(

      datos.map(item => ({

        estado:item.estado,

        cantidad:item._count.estado

      }))

    );



  } catch(error) {


    res.status(500).json({

      mensaje:"Error obteniendo solicitudes"

    });


  }


};









export const cotizacionesReporte = async (

  req: Request,

  res: Response

) => {


  try {


    const datos = await prisma.cotizacion.groupBy({

      by:[

        "estado"

      ],


      _count:{

        estado:true

      }


    });



    res.json(

      datos.map(item => ({

        estado:item.estado,

        cantidad:item._count.estado

      }))

    );



  } catch(error) {


    res.status(500).json({

      mensaje:"Error obteniendo cotizaciones"

    });


  }


};









export const equipamientosReporte = async (

  req: Request,

  res: Response

) => {


  try {


    const datos = await prisma.equipamiento.groupBy({

      by:[

        "categoria"

      ],


      _count:{

        categoria:true

      }


    });



    res.json(

      datos.map(item => ({

        categoria:item.categoria,

        cantidad:item._count.categoria

      }))

    );



  } catch(error) {


    res.status(500).json({

      mensaje:"Error obteniendo equipamientos"

    });


  }


};









export const proveedoresReporte = async (

  req: Request,

  res: Response

) => {


  try {


    const proveedores = await prisma.proveedor.findMany({

      include:{

        cotizaciones:true

      }


    });



    const ranking = proveedores.map(proveedor => ({


      proveedorId:proveedor.id,


      nombreEmpresa:proveedor.nombreEmpresa,


      cantidadCotizaciones:

        proveedor.cotizaciones.length


    }));



    ranking.sort(

      (a,b)=>

        b.cantidadCotizaciones -

        a.cantidadCotizaciones

    );



    res.json(ranking);



  } catch(error) {


    res.status(500).json({

      mensaje:"Error obteniendo proveedores"

    });


  }


};