import prisma from "../prisma/prisma";


/*
 * ==========================================
 * DATOS PARA CREAR COTIZACIÓN
 * ==========================================
 */

export interface CrearCotizacionData {

    id_solicitud: number;

    id_proveedor: number;

    nombre_proveedor: string;

    precio_unitario_cotizacion: number;

    precio_total_cotizacion: number;

    plazo_entrega_dias_cotizacion: number;

    garantia_meses_cotizacion: number;

    descripcion_cotizacion: string;

    estado_cotizacion: string;

    incluye_cotizacion?: {

        descripcion: string;

    }[];

}



/*
 * ==========================================
 * DATOS PARA ACTUALIZAR COTIZACIÓN
 * ==========================================
 */

export interface ActualizarCotizacionData {

    id_solicitud?: number;

    id_proveedor?: number;

    nombre_proveedor?: string;

    precio_unitario_cotizacion?: number;

    precio_total_cotizacion?: number;

    plazo_entrega_dias_cotizacion?: number;

    garantia_meses_cotizacion?: number;

    descripcion_cotizacion?: string;

    estado_cotizacion?: string;

    incluye_cotizacion?: {

        descripcion: string;

    }[];

}



/*
 * ==========================================
 * LISTAR TODAS LAS COTIZACIONES
 * ==========================================
 */

export const listarCotizaciones = async () => {

    return await prisma.cotizacion.findMany({

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    name_user: true,

                    email: true,

                    organizacion: true

                }

            },

            incluye_cotizacion: true

        },

        orderBy: {

            fecha_envio_cotizacion: "desc"

        }

    });

};



/*
 * ==========================================
 * BUSCAR COTIZACIÓN
 * ==========================================
 */

export const buscarCotizacion = async (

    id_cotizacion: number

) => {

    return await prisma.cotizacion.findUnique({

        where: {

            id_cotizacion

        },

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    name_user: true,

                    email: true,

                    organizacion: true

                }

            },

            incluye_cotizacion: true

        }

    });

};



/*
 * ==========================================
 * LISTAR COTIZACIONES DE UNA SOLICITUD
 * ==========================================
 */

export const listarCotizacionesPorSolicitud = async (

    id_solicitud: number

) => {

    return await prisma.cotizacion.findMany({

        where: {

            id_solicitud

        },

        include: {

            proveedor: {

                select: {

                    id: true,

                    name_user: true,

                    email: true,

                    organizacion: true

                }

            },

            incluye_cotizacion: true

        },

        orderBy: {

            precio_total_cotizacion: "asc"

        }

    });

};



/*
 * ==========================================
 * LISTAR COTIZACIONES DE UN PROVEEDOR
 * ==========================================
 */

export const listarCotizacionesPorProveedor = async (

    id_proveedor: number

) => {

    return await prisma.cotizacion.findMany({

        where: {

            id_proveedor

        },

        include: {

            solicitud: true,

            incluye_cotizacion: true

        },

        orderBy: {

            fecha_envio_cotizacion: "desc"

        }

    });

};



/*
 * ==========================================
 * CREAR COTIZACIÓN
 * ==========================================
 */

export const crearCotizacion = async (

    data: CrearCotizacionData

) => {


    const {

        incluye_cotizacion,

        ...datosCotizacion

    } = data;



    return await prisma.cotizacion.create({

        data: {

            ...datosCotizacion,

            incluye_cotizacion:

                incluye_cotizacion &&
                incluye_cotizacion.length > 0

                ?

                {

                    create:
                        incluye_cotizacion

                }

                :

                undefined

        },

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    name_user: true,

                    email: true,

                    organizacion: true

                }

            },

            incluye_cotizacion: true

        }

    });

};



/*
 * ==========================================
 * ACTUALIZAR COTIZACIÓN
 * ==========================================
 */

export const actualizarCotizacion = async (

    id_cotizacion: number,

    data: ActualizarCotizacionData

) => {


    const {

        incluye_cotizacion,

        ...datosCotizacion

    } = data;



    /*
     * Si se mandan elementos incluidos,
     * reemplazamos los existentes.
     */

    if (
        incluye_cotizacion !== undefined
    ) {


        return await prisma.$transaction(

            async (tx) => {


                /*
                 * Eliminar elementos anteriores
                 */

                await tx.incluyeCotizacion.deleteMany({

                    where: {

                        id_cotizacion

                    }

                });



                /*
                 * Actualizar cotización
                 */

                return await tx.cotizacion.update({

                    where: {

                        id_cotizacion

                    },

                    data: {

                        ...datosCotizacion,

                        incluye_cotizacion: {

                            create:
                                incluye_cotizacion

                        }

                    },

                    include: {

                        solicitud: true,

                        proveedor: {

                            select: {

                                id: true,

                                name_user: true,

                                email: true,

                                organizacion: true

                            }

                        },

                        incluye_cotizacion: true

                    }

                });

            }

        );

    }



    /*
     * Actualizar solamente
     * los datos de la cotización.
     */

    return await prisma.cotizacion.update({

        where: {

            id_cotizacion

        },

        data: datosCotizacion,

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    name_user: true,

                    email: true,

                    organizacion: true

                }

            },

            incluye_cotizacion: true

        }

    });

};



/*
 * ==========================================
 * ELIMINAR COTIZACIÓN
 * ==========================================
 */

export const eliminarCotizacion = async (

    id_cotizacion: number

) => {

    return await prisma.cotizacion.delete({

        where: {

            id_cotizacion

        }

    });

};



/*
 * ==========================================
 * AGREGAR ELEMENTO INCLUIDO
 * ==========================================
 */

export const agregarIncluyeCotizacion = async (

    id_cotizacion: number,

    descripcion: string

) => {

    return await prisma.incluyeCotizacion.create({

        data: {

            id_cotizacion,

            descripcion

        }

    });

};



/*
 * ==========================================
 * ELIMINAR ELEMENTO INCLUIDO
 * ==========================================
 */

export const eliminarIncluyeCotizacion = async (

    id: number

) => {

    return await prisma.incluyeCotizacion.delete({

        where: {

            id

        }

    });

};
