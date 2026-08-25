// cotimed-api/src/services/instituciones.service.ts

// =========================================================
// IMPORTS
// =========================================================

import {
    PrismaClient,
    EstadoInstitucion,
    RolUsuario,
    EstadoUsuario,
} from "@prisma/client";

import bcrypt from "bcrypt";


// =========================================================
// PRISMA
// =========================================================

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

                    tipo_documento: true,

                    numero_documento: true,

                    avatar_url: true,

                    ultimo_login: true,

                    email_verificado: true,

                    institucion_id: true,

                    proveedor_id: true,

                    fecha_creacion: true,

                    fecha_actualizacion: true,

                    eliminado: true,

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

                        tipo_documento: true,

                        numero_documento: true,

                        avatar_url: true,

                        ultimo_login: true,

                        email_verificado: true,

                        institucion_id: true,

                        proveedor_id: true,

                        fecha_creacion: true,

                        fecha_actualizacion: true,

                        eliminado: true,

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


    // =====================================================
    // NORMALIZAR DATOS
    // =====================================================

    const email =
        data.email.trim().toLowerCase();


    // =====================================================
    // VERIFICAR EMAIL
    // =====================================================

    const usuarioExistente =
        await prisma.usuario.findUnique({

            where: {

                email,

            },

        });


    if (usuarioExistente) {

        throw new Error(
            "Ya existe un usuario registrado con ese email"
        );

    }


    // =====================================================
    // VERIFICAR EMAIL DE LA INSTITUCIÓN
    // =====================================================

    if (email) {

        const institucionConEmail =
            await prisma.institucion.findFirst({

                where: {

                    email,

                    eliminado: false,

                },

            });


        if (institucionConEmail) {

            throw new Error(
                "Ya existe una institución registrada con ese email"
            );

        }

    }


    // =====================================================
    // VERIFICAR CUIT
    // =====================================================

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


    // =====================================================
    // VALIDAR PASSWORD
    // =====================================================

    if (!data.password || data.password.trim().length < 6) {

        throw new Error(
            "La contraseña debe tener al menos 6 caracteres"
        );

    }


    // =====================================================
    // HASHEAR PASSWORD
    // =====================================================

    const passwordHash =
        await bcrypt.hash(
            data.password,
            12
        );


    // =====================================================
    // CREAR INSTITUCIÓN + USUARIO
    // =====================================================

    const resultado =
        await prisma.$transaction(

            async (tx) => {

                // =============================================
                // CREAR INSTITUCIÓN
                // =============================================

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

                            email,

                            telefono:
                                data.telefono,

                            sitio_web:
                                data.sitio_web,

                            estado:
                                data.estado ??
                                EstadoInstitucion.PENDIENTE,

                        },

                    });


                // =============================================
                // CREAR USUARIO PRINCIPAL
                // =============================================

                const usuario =
                    await tx.usuario.create({

                        data: {

                            nombre:
                                data.nombre,

                            apellido:
                                data.apellido,

                            email,

                            password:
                                passwordHash,

                            telefono:
                                data.telefono,

                            rol:
                                RolUsuario.INSTITUCION,

                            estado:
                                EstadoUsuario.ACTIVO,

                            email_verificado:
                                false,

                            institucion: {

                                connect: {

                                    id:
                                        institucion.id,

                                },

                            },

                        },

                        select: {

                            id: true,

                            nombre: true,

                            apellido: true,

                            email: true,

                            telefono: true,

                            rol: true,

                            estado: true,

                            tipo_documento: true,

                            numero_documento: true,

                            avatar_url: true,

                            ultimo_login: true,

                            email_verificado: true,

                            institucion_id: true,

                            proveedor_id: true,

                            fecha_creacion: true,

                            fecha_actualizacion: true,

                            eliminado: true,

                        },

                    });


                // =============================================
                // RETORNAR RESULTADO
                // =============================================

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

        nombre_comercial?: string | null;

        cuit?: string | null;

        descripcion?: string | null;

        email?: string;

        telefono?: string | null;

        sitio_web?: string | null;

        logo_url?: string | null;

        estado?: EstadoInstitucion;

        password?: string;

    }

) => {


    // =====================================================
    // VERIFICAR INSTITUCIÓN
    // =====================================================

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


    // =====================================================
    // NORMALIZAR EMAIL
    // =====================================================

    const emailNormalizado =
        data.email !== undefined
            ? data.email.trim().toLowerCase()
            : undefined;


    // =====================================================
    // VERIFICAR EMAIL
    // =====================================================

    if (
        emailNormalizado &&
        emailNormalizado !== institucion.email
    ) {

        const emailExistente =
            await prisma.usuario.findUnique({

                where: {

                    email:
                        emailNormalizado,

                },

            });


        if (emailExistente) {

            throw new Error(
                "El email ya está siendo utilizado"
            );

        }


        const institucionConEmail =
            await prisma.institucion.findFirst({

                where: {

                    email:
                        emailNormalizado,

                    eliminado: false,

                    NOT: {

                        id,

                    },

                },

            });


        if (institucionConEmail) {

            throw new Error(
                "El email ya está siendo utilizado"
            );

        }

    }


    // =====================================================
    // VERIFICAR CUIT
    // =====================================================

    if (
        data.cuit !== undefined &&
        data.cuit !== null &&
        data.cuit !== institucion.cuit
    ) {

        const cuitExistente =
            await prisma.institucion.findUnique({

                where: {

                    cuit:
                        data.cuit,

                },

            });


        if (
            cuitExistente &&
            cuitExistente.id !== id
        ) {

            throw new Error(
                "El CUIT ya está siendo utilizado"
            );

        }

    }


    // =====================================================
    // ACTUALIZAR
    // =====================================================

    return await prisma.$transaction(

        async (tx) => {

            // =============================================
            // DATOS DE INSTITUCIÓN
            // =============================================

            const datosInstitucion: {

                razon_social?: string;

                nombre_comercial?: string | null;

                cuit?: string | null;

                descripcion?: string | null;

                email?: string;

                telefono?: string | null;

                sitio_web?: string | null;

                logo_url?: string | null;

                estado?: EstadoInstitucion;

            } = {

                ...(data.razon_social !== undefined
                    ? {
                        razon_social:
                            data.razon_social
                    }
                    : {}),

                ...(data.nombre_comercial !== undefined
                    ? {
                        nombre_comercial:
                            data.nombre_comercial
                    }
                    : {}),

                ...(data.cuit !== undefined
                    ? {
                        cuit:
                            data.cuit
                    }
                    : {}),

                ...(data.descripcion !== undefined
                    ? {
                        descripcion:
                            data.descripcion
                    }
                    : {}),

                ...(emailNormalizado !== undefined
                    ? {
                        email:
                            emailNormalizado
                    }
                    : {}),

                ...(data.telefono !== undefined
                    ? {
                        telefono:
                            data.telefono
                    }
                    : {}),

                ...(data.sitio_web !== undefined
                    ? {
                        sitio_web:
                            data.sitio_web
                    }
                    : {}),

                ...(data.logo_url !== undefined
                    ? {
                        logo_url:
                            data.logo_url
                    }
                    : {}),

                ...(data.estado !== undefined
                    ? {
                        estado:
                            data.estado
                    }
                    : {}),

            };


            // =============================================
            // ACTUALIZAR INSTITUCIÓN
            // =============================================

            const institucionActualizada =
                await tx.institucion.update({

                    where: {

                        id,

                    },

                    data:
                        datosInstitucion,

                });


            // =============================================
            // BUSCAR USUARIO PRINCIPAL
            // =============================================

            const usuarioPrincipal =
                await tx.usuario.findFirst({

                    where: {

                        institucion_id:
                            id,

                        eliminado: false,

                        rol:
                            RolUsuario.INSTITUCION,

                    },

                    orderBy: {

                        id: "asc",

                    },

                });


            // =============================================
            // ACTUALIZAR USUARIO PRINCIPAL
            // =============================================

            if (usuarioPrincipal) {

                const datosUsuario: {

                    email?: string;

                    telefono?: string | null;

                    password?: string;

                } = {};


                if (
                    emailNormalizado !== undefined
                ) {

                    datosUsuario.email =
                        emailNormalizado;

                }


                if (
                    data.telefono !== undefined
                ) {

                    datosUsuario.telefono =
                        data.telefono;

                }


                // =========================================
                // CAMBIAR PASSWORD
                // =========================================

                if (
                    data.password !== undefined
                ) {

                    if (
                        data.password.trim().length < 6
                    ) {

                        throw new Error(
                            "La contraseña debe tener al menos 6 caracteres"
                        );

                    }


                    datosUsuario.password =
                        await bcrypt.hash(
                            data.password,
                            12
                        );

                }


                if (
                    Object.keys(datosUsuario).length > 0
                ) {

                    await tx.usuario.update({

                        where: {

                            id:
                                usuarioPrincipal.id,

                        },

                        data:
                            datosUsuario,

                    });

                }

            }


            // =============================================
            // DEVOLVER INSTITUCIÓN ACTUALIZADA
            // =============================================

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


    // =====================================================
    // VERIFICAR INSTITUCIÓN
    // =====================================================

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


    // =====================================================
    // ACTUALIZAR ESTADO
    // =====================================================

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

            telefono: true,

            estado: true,

            cuit: true,

            descripcion: true,

            sitio_web: true,

            logo_url: true,

            fecha_creacion: true,

            fecha_actualizacion: true,

            eliminado: true,

        },

    });

};


// =========================================================
// ELIMINAR INSTITUCIÓN
// =========================================================

export const eliminarInstitucion = async (
    id: number
) => {


    // =====================================================
    // VERIFICAR INSTITUCIÓN
    // =====================================================

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


    // =====================================================
    // ELIMINACIÓN LÓGICA
    // =====================================================

    return await prisma.$transaction(

        async (tx) => {

            // =============================================
            // MARCAR INSTITUCIÓN COMO ELIMINADA
            // =============================================

            const institucionEliminada =
                await tx.institucion.update({

                    where: {

                        id,

                    },

                    data: {

                        eliminado: true,

                        estado:
                            EstadoInstitucion.INACTIVA,

                    },

                });


            // =============================================
            // MARCAR USUARIOS DE LA INSTITUCIÓN
            // COMO ELIMINADOS
            // =============================================

            await tx.usuario.updateMany({

                where: {

                    institucion_id:
                        id,

                    eliminado: false,

                },

                data: {

                    eliminado: true,

                    estado:
                        EstadoUsuario.INACTIVO,

                },

            });


            return institucionEliminada;

        }

    );

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

                        tipo_documento: true,

                        numero_documento: true,

                        avatar_url: true,

                        ultimo_login: true,

                        email_verificado: true,

                        institucion_id: true,

                        proveedor_id: true,

                        fecha_creacion: true,

                        fecha_actualizacion: true,

                        eliminado: true,

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