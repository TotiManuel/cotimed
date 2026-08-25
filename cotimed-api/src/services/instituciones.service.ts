// cotimed-api/src/services/instituciones.service.ts

import {
    PrismaClient,
    EstadoInstitucion,
} from "@prisma/client";

import bcrypt from "bcrypt";


const prisma = new PrismaClient();


// =========================================================
// OBTENER TODAS LAS INSTITUCIONES
// =========================================================

export const obtenerInstituciones = async () => {

    return await prisma.institucion.findMany({

        where: {

            eliminado: false,

        },

        include: {

            usuarios: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                    telefono: true,

                    rol: true,

                    estado: true,

                },

            },

            direcciones: true,

            contactos: true,

        },

        orderBy: {

            id: "desc",

        },

    });

};


// =========================================================
// OBTENER INSTITUCIÓN POR ID
// =========================================================

export const obtenerInstitucionPorId = async (
    id: number
) => {

    const institucion =
        await prisma.institucion.findUnique({

            where: {

                id,

            },

            include: {

                usuarios: {

                    select: {

                        id: true,

                        nombre: true,

                        apellido: true,

                        email: true,

                        telefono: true,

                        rol: true,

                        estado: true,

                    },

                },

                direcciones: true,

                contactos: true,

                solicitudes: true,

            },

        });


    if (!institucion) {

        throw new Error(
            "Institución no encontrada"
        );

    }


    return institucion;

};


// =========================================================
// CREAR INSTITUCIÓN
// =========================================================

export const crearInstitucion = async (
    data: {

        nombre: string;

        apellido?: string;

        razon_social: string;

        nombre_comercial?: string;

        cuit?: string;

        descripcion?: string;

        email: string;

        password: string;

        telefono?: string;

        sitio_web?: string;

        estado?: EstadoInstitucion;

    }
) => {


    // -----------------------------------------------------
    // VERIFICAR EMAIL
    // -----------------------------------------------------

    const usuarioExistente =
        await prisma.usuario.findUnique({

            where: {

                email: data.email,

            },

        });


    if (usuarioExistente) {

        throw new Error(
            "Ya existe un usuario registrado con ese email"
        );

    }


    // -----------------------------------------------------
    // VERIFICAR CUIT
    // -----------------------------------------------------

    if (data.cuit) {

        const institucionConCuit =
            await prisma.institucion.findUnique({

                where: {

                    cuit: data.cuit,

                },

            });


        if (institucionConCuit) {

            throw new Error(
                "Ya existe una institución registrada con ese CUIT"
            );

        }

    }


    // -----------------------------------------------------
    // HASHEAR PASSWORD
    // -----------------------------------------------------

    const passwordHash =
        await bcrypt.hash(
            data.password,
            12
        );


    // -----------------------------------------------------
    // CREAR INSTITUCIÓN + USUARIO
    // -----------------------------------------------------

    const resultado =
        await prisma.$transaction(

            async (tx) => {


                const institucion =
                    await tx.institucion.create({

                        data: {

                            razon_social:
                                data.razon_social,

                            nombre_comercial:
                                data.nombre_comercial,

                            cuit:
                                data.cuit,

                            descripcion:
                                data.descripcion,

                            email:
                                data.email,

                            telefono:
                                data.telefono,

                            sitio_web:
                                data.sitio_web,

                            estado:
                                data.estado ??
                                EstadoInstitucion.PENDIENTE,

                        },

                    });


                const usuario =
                    await tx.usuario.create({

                        data: {

                            nombre:
                                data.nombre,

                            apellido:
                                data.apellido,

                            email:
                                data.email,

                            // =================================
                            // PASSWORD HASHEADA
                            // =================================

                            password:
                                passwordHash,

                            telefono:
                                data.telefono,

                            rol:
                                "INSTITUCION",

                            estado:
                                "ACTIVO",

                            institucion: {

                                connect: {

                                    id:
                                        institucion.id,

                                },

                            },

                        },

                    });


                return {

                    institucion,

                    usuario,

                };

            }

        );


    return resultado;

};


// =========================================================
// ACTUALIZAR INSTITUCIÓN
// =========================================================

export const actualizarInstitucion = async (

    id: number,

    data: {

        razon_social?: string;

        nombre_comercial?: string;

        cuit?: string;

        descripcion?: string;

        email?: string;

        telefono?: string;

        sitio_web?: string;

        estado?: EstadoInstitucion;

    }

) => {


    // -----------------------------------------------------
    // VERIFICAR INSTITUCIÓN
    // -----------------------------------------------------

    const institucion =
        await prisma.institucion.findUnique({

            where: {

                id,

            },

        });


    if (!institucion) {

        throw new Error(
            "Institución no encontrada"
        );

    }


    // -----------------------------------------------------
    // VERIFICAR EMAIL
    // -----------------------------------------------------

    if (
        data.email &&
        data.email !== institucion.email
    ) {

        const emailExistente =
            await prisma.usuario.findUnique({

                where: {

                    email:
                        data.email,

                },

            });


        if (emailExistente) {

            throw new Error(
                "El email ya está siendo utilizado"
            );

        }

    }


    // -----------------------------------------------------
    // VERIFICAR CUIT
    // -----------------------------------------------------

    if (
        data.cuit &&
        data.cuit !== institucion.cuit
    ) {

        const cuitExistente =
            await prisma.institucion.findUnique({

                where: {

                    cuit:
                        data.cuit,

                },

            });


        if (cuitExistente) {

            throw new Error(
                "El CUIT ya está siendo utilizado"
            );

        }

    }


    // -----------------------------------------------------
    // ACTUALIZAR
    // -----------------------------------------------------

    return await prisma.$transaction(

        async (tx) => {


            const institucionActualizada =
                await tx.institucion.update({

                    where: {

                        id,

                    },

                    data,

                });


            // -------------------------------------------------
            // ACTUALIZAR DATOS DEL USUARIO PRINCIPAL
            // -------------------------------------------------

            if (
                data.email !== undefined ||
                data.telefono !== undefined
            ) {

                const usuarioPrincipal =
                    await tx.usuario.findFirst({

                        where: {

                            institucion_id:
                                id,

                            eliminado: false,

                        },

                        orderBy: {

                            id: "asc",

                        },

                    });


                if (usuarioPrincipal) {

                    await tx.usuario.update({

                        where: {

                            id:
                                usuarioPrincipal.id,

                        },

                        data: {

                            ...(data.email !== undefined
                                ? {
                                    email:
                                        data.email
                                }
                                : {}),

                            ...(data.telefono !== undefined
                                ? {
                                    telefono:
                                        data.telefono
                                }
                                : {}),

                        },

                    });

                }

            }


            return institucionActualizada;

        }

    );

};


// =========================================================
// CAMBIAR ESTADO DE INSTITUCIÓN
// =========================================================

export const cambiarEstadoInstitucion = async (

    id: number,

    estado: EstadoInstitucion

) => {


    const institucion =
        await prisma.institucion.findUnique({

            where: {

                id,

            },

        });


    if (!institucion) {

        throw new Error(
            "Institución no encontrada"
        );

    }


    return await prisma.institucion.update({

        where: {

            id,

        },

        data: {

            estado,

        },

        select: {

            id: true,

            razon_social: true,

            nombre_comercial: true,

            email: true,

            estado: true,

        },

    });

};


// =========================================================
// ELIMINAR INSTITUCIÓN
// =========================================================

export const eliminarInstitucion = async (
    id: number
) => {


    const institucion =
        await prisma.institucion.findUnique({

            where: {

                id,

            },

        });


    if (!institucion) {

        throw new Error(
            "Institución no encontrada"
        );

    }


    /*
     * Usamos eliminación lógica porque
     * el modelo Institucion tiene:
     *
     * eliminado Boolean @default(false)
     */

    return await prisma.institucion.update({

        where: {

            id,

        },

        data: {

            eliminado: true,

            estado:
                EstadoInstitucion.INACTIVA,

        },

    });

};


// =========================================================
// OBTENER INSTITUCIÓN + SOLICITUDES
// =========================================================

export const obtenerInstitucionConSolicitudes = async (
    id: number
) => {


    const institucion =
        await prisma.institucion.findUnique({

            where: {

                id,

            },

            include: {

                usuarios: {

                    select: {

                        id: true,

                        nombre: true,

                        apellido: true,

                        email: true,

                        telefono: true,

                        rol: true,

                        estado: true,

                    },

                },

                direcciones: true,

                contactos: true,

                solicitudes: {

                    orderBy: {

                        fecha_creacion:
                            "desc",

                    },

                },

            },

        });


    if (!institucion) {

        throw new Error(
            "Institución no encontrada"
        );

    }


    return institucion;

};